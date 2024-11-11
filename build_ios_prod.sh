#!/bin/bash

# 0. Setup 
# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if app name is provided
if [ $# -eq 0 ]; then
    echo "${RED}Error: Please provide the app name as an argument${NC}"
    echo "Usage: $0 <APP_NAME>"
    echo "Example: $0 MyAwesomeApp"
    exit 1
fi

# Store app name from argument
PROJECT_NAME=$1

echo "🚀 Starting iOS Production Build..."

# Function to check if last command was successful
check_status() {
    if [ $? -eq 0 ]; then
        echo "${GREEN}✅ $1 completed successfully${NC}"
    else
        echo "${RED}❌ $1 failed${NC}"
        exit 1
    fi
}

# 1. Clean previous builds
echo "${YELLOW}Cleaning previous builds...${NC}"
rm -rf ios/build
check_status "Clean build directory"

# Clean npm cache and node_modules
echo "${YELLOW}Cleaning npm cache and node_modules...${NC}"
npm cache clean --force
rm -rf node_modules
rm -rf package-lock.json
check_status "Clean npm and node_modules"

# 2. Install node modules
echo "${YELLOW}Installing node modules...${NC}"
npm install
check_status "NPM install"

# 3. Clean and install pods
echo "${YELLOW}Installing pods...${NC}"
cd ios
rm -rf ~/Library/Developer/Xcode/DerivedData
pod cache clean --all
pod deintegrate
pod setup
pod install --repo-update
check_status "Pod install"
cd ../

# 4. Build the JavaScript bundle
echo "${YELLOW}Building JavaScript bundle...${NC}"
npx react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios/main.jsbundle \
    --assets-dest ios
check_status "JavaScript bundle"

# 5. Build the iOS app
echo "${YELLOW}Building iOS app...${NC}"
cd ios

# # Build for simulator
echo "${YELLOW}Building for iOS Simulator...${NC}"
xcodebuild -workspace $PROJECT_NAME.xcworkspace \
    -scheme $PROJECT_NAME \
    -configuration Debug \
    -destination 'generic/platform=iOS Simulator' \
    CONFIGURATION_BUILD_DIR=$PWD/build
check_status "Simulator build"

cd ..

echo "${GREEN}🎉 Production build completed!${NC}"
echo "${YELLOW}Build locations:${NC}"
echo "  • Simulator build: ios/build/Debug-iphonesimulator"