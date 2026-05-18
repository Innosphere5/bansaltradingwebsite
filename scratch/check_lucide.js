const lucide = require('lucide-react');
const keys = Object.keys(lucide);
const search = ['Camera', 'Send', 'Share2', 'Users', 'Link'];
search.forEach(s => {
  console.log(`${s}: ${keys.includes(s) ? 'YES' : 'NO'}`);
});
