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

# 5. Build the iOS app locally
cd ../
echo "${YELLOW}Building for iOS Locally...${NC}"

# Clear the metro cache
npx react-native start --reset-cache
check_status "Reset metro cache"

# Run the app
npx react-native run-ios
check_status "Run iOS app"

echo "${GREEN}🎉 Development build completed!${NC}"