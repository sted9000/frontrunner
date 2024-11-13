#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}❌ $1 is not installed${NC}"
        return 1
    else
        echo -e "${GREEN}✓ $1 is installed${NC}"
        return 0
    fi
}

# Function to check Java version
check_java() {
    if java -version 2>&1 | grep -q "openjdk version"; then
        echo -e "${GREEN}✓ Java is installed${NC}"
        return 0
    else
        echo -e "${RED}❌ OpenJDK is not installed${NC}"
        return 1
    fi
}

# Check for required tools
echo "Checking required tools..."
required_tools=(node npm)
missing_tools=0

# Check Java first
if ! check_java; then
    echo "Please install OpenJDK using:"
    echo "brew install openjdk@11"
    missing_tools=$((missing_tools + 1))
fi

# Check other required tools
for tool in "${required_tools[@]}"; do
    if ! check_command "$tool"; then
        case $tool in
            "node")
                echo "Install Node.js using: brew install node"
                ;;
        esac
        missing_tools=$((missing_tools + 1))
    fi
done

# Check if ANDROID_HOME is set
if [ -z "$ANDROID_HOME" ]; then
    echo -e "${RED}❌ ANDROID_HOME is not set${NC}"
    echo "Add the following to your ~/.zshrc or ~/.bash_profile:"
    echo "export ANDROID_HOME=\$HOME/Library/Android/sdk"
    echo "export PATH=\$PATH:\$ANDROID_HOME/tools"
    echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools"
    missing_tools=$((missing_tools + 1))
fi

# Exit if any required tools are missing
if [ $missing_tools -gt 0 ]; then
    echo -e "${RED}Please install missing requirements before proceeding${NC}"
    exit 1
fi

# Main build process
echo -e "${YELLOW}Starting APK build process...${NC}"

# Clean install dependencies
echo "Installing dependencies..."
npm install

# Bundle JavaScript
echo "Bundling JavaScript..."
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

# Create assets directory if it doesn't exist
mkdir -p android/app/src/main/assets

# Clean Android build
echo "Cleaning Android build..."
cd android && ./gradlew clean

# Build choices
echo -e "${YELLOW}Select build type:${NC}"
echo "1. Debug APK (unsigned)"
echo "2. Release APK (signed)"
read -p "Enter choice (1 or 2): " build_choice

case $build_choice in
    1)
        echo "Building debug APK..."
        ./gradlew assembleDebug
        
        if [ $? -eq 0 ]; then
            debug_apk_path="app/build/outputs/apk/debug/app-debug.apk"
            if [ -f "$debug_apk_path" ]; then
                echo -e "${GREEN}Debug APK built successfully!${NC}"
                echo "APK location: $(pwd)/$debug_apk_path"
                
                # Create a copy with timestamp
                timestamp=$(date +%Y%m%d_%H%M%S)
                cp "$debug_apk_path" "app/build/outputs/apk/debug/app-debug-${timestamp}.apk"
                echo "Timestamped copy created: app-debug-${timestamp}.apk"
            else
                echo -e "${RED}APK file not found at expected location${NC}"
            fi
        else
            echo -e "${RED}Debug build failed${NC}"
            exit 1
        fi
        ;;
        
    2)
        echo "Building release APK..."
        # Check if keystore exists
        if [ ! -f "app/your-release-key.keystore" ]; then
            echo -e "${YELLOW}No keystore found. Do you want to generate one? (y/n)${NC}"
            read -r generate_keystore
            
            if [[ "$generate_keystore" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
                echo "Generating keystore..."
                read -p "Enter keystore password: " keystore_password
                read -p "Enter key alias: " key_alias
                read -p "Enter key password: " key_password
                
                keytool -genkey -v -keystore app/your-release-key.keystore \
                    -alias "$key_alias" \
                    -keyalg RSA \
                    -keysize 2048 \
                    -validity 10000 \
                    -storepass "$keystore_password" \
                    -keypass "$key_password"
            else
                echo -e "${RED}Cannot build release APK without keystore${NC}"
                exit 1
            fi
        fi
        
        # Build release APK
        ./gradlew assembleRelease
        
        if [ $? -eq 0 ]; then
            release_apk_path="app/build/outputs/apk/release/app-release.apk"
            if [ -f "$release_apk_path" ]; then
                echo -e "${GREEN}Release APK built successfully!${NC}"
                echo "APK location: $(pwd)/$release_apk_path"
                
                # Create a copy with timestamp
                timestamp=$(date +%Y%m%d_%H%M%S)
                cp "$release_apk_path" "app/build/outputs/apk/release/app-release-${timestamp}.apk"
                echo "Timestamped copy created: app-release-${timestamp}.apk"
            else
                echo -e "${RED}APK file not found at expected location${NC}"
            fi
        else
            echo -e "${RED}Release build failed${NC}"
            exit 1
        fi
        ;;
        
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

cd ..
echo -e "${GREEN}Build process completed!${NC}"