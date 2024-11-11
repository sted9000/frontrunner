// Get the market cap from the copied text
const marketCap = maestro.copiedText;

// Strip the $ and commas from the market cap   
const marketCapValue = parseFloat(marketCap.replace(/[$,]/g, ''));

// Return true if the market cap is greater than 0
if (marketCapValue > 0) {
    output.marketCap = true;
} else {
    output.marketCap = false;
}