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
required_tools=(node npm watchman adb)
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
            "watchman")
                echo "Install Watchman using: brew install watchman"
                ;;
            "adb")
                echo "Install Android platform tools using: brew install android-platform-tools"
                ;;
        esac
        missing_tools=$((missing_tools + 1))
    fi
done

# Check if Android Studio is installed
if [ ! -d "/Applications/Android Studio.app" ]; then
    echo -e "${RED}❌ Android Studio is not installed${NC}"
    echo "Please install Android Studio from: https://developer.android.com/studio"
    missing_tools=$((missing_tools + 1))
fi

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

# Function to check if an Android device/emulator is connected
check_android_device() {
    if adb devices | grep -q "device$"; then
        return 0
    else
        return 1
    fi
}

# Main build and launch process
echo -e "${YELLOW}Starting build process...${NC}"

# Clean install dependencies
echo "Installing dependencies..."
npm install

# Clean Android build
echo "Cleaning Android build..."
cd android && ./gradlew clean
cd ..

# Build Android app
echo "Building Android app..."
cd android && ./gradlew assembleDebug
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed${NC}"
    exit 1
fi
cd ..

# Check for connected device
if ! check_android_device; then
    echo -e "${YELLOW}No Android device/emulator detected${NC}"
    echo "Would you like to start an emulator? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
        echo "Starting Android emulator..."
        emulator -list-avds | head -n 1 | xargs -I {} emulator -avd {} &
        sleep 10
    else
        echo -e "${RED}Please connect a device or start an emulator manually${NC}"
        exit 1
    fi
fi

# Install and launch the app
echo "Installing and launching the app..."
npx react-native run-android

if [ $? -eq 0 ]; then
    echo -e "${GREEN}App built and launched successfully!${NC}"
    # Start Metro bundler if not already running
    echo "Starting Metro bundler..."
    npx react-native start
else
    echo -e "${RED}Failed to launch the app${NC}"
    exit 1
fi