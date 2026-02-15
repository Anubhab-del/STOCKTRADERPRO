const fs = require('fs');
const path = require('path');

// Files that need icon fixes
const filesToFix = [
  'src/components/dashboard/MarketOverview.jsx',
  'src/components/stocks/StockTable.jsx',
  'src/pages/LandingPage.jsx'
];

filesToFix.forEach(file => {
  const filepath = path.join(__dirname, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Replace import statement
    content = content.replace(
      /import \{ (.*?)FaTrendingUp, FaTrendingDown(.*?) \} from 'react-icons\/fa';/,
      "import { $1FaArrowUp, FaArrowDown$2 } from 'react-icons/fa';"
    );
    
    // Replace usage
    content = content.replace(/FaTrendingUp/g, 'FaArrowUp');
    content = content.replace(/FaTrendingDown/g, 'FaArrowDown');
    
    fs.writeFileSync(filepath, content);
    console.log(`✅ Fixed: ${file}`);
  }
});

console.log('\n🎉 All icon imports fixed!');