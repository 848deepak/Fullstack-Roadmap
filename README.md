# Dynamic Product Filter

A fully functional product filter and sorting system built with vanilla JavaScript, HTML, and CSS.

## Features

### 🔍 Multiple Sorting Options
- **Name (A-Z / Z-A)**: Alphabetical sorting
- **Price (Low to High / High to Low)**: Sort by price
- **Rating (High to Low / Low to High)**: Sort by customer rating
- **Default**: Original order

### 🎯 Advanced Filtering
- **Category Filter**: Filter by product categories (Electronics, Clothing, Books, Home & Kitchen, Sports)
- **Price Range**: Slider to filter products by maximum price
- **Combined Filters**: All filters work together seamlessly

### ✨ User Interface
- Responsive design that works on all devices
- Smooth animations and transitions
- Real-time product count display
- Reset filters button for quick clearing
- Modern gradient background
- Clean card-based product display

### 📦 Product Display
Each product card shows:
- Product icon/emoji
- Category badge
- Product name
- Description
- Price
- Star rating

## How to Use

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - No server or build process required!

2. **Sort Products**
   - Use the "Sort By" dropdown to organize products by name, price, or rating

3. **Filter by Category**
   - Select a category from the "Category" dropdown to show only products from that category

4. **Filter by Price**
   - Use the price slider to set a maximum price
   - Only products within your budget will be displayed

5. **Reset Filters**
   - Click the "Reset Filters" button to clear all filters and sorting

## Project Structure

```
fullstack/
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # Product data and filtering logic
└── README.md       # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **Vanilla JavaScript**: No frameworks or libraries required

## Sample Data

The application includes 15 sample products across 5 categories:
- Electronics (headphones, smart watch, laptop stand, speaker)
- Clothing (t-shirts, jeans, jackets)
- Books (programming guides)
- Home & Kitchen (coffee maker, cookware, blender)
- Sports (running shoes, yoga mat, tennis racket)

## Customization

### Adding New Products

Edit `script.js` and add items to the `products` array:

```javascript
{
    id: 16,
    name: "Product Name",
    category: "electronics",
    price: 99,
    rating: 4.5,
    description: "Product description",
    icon: "🎮"
}
```

### Adding New Categories

1. Add the category option in `index.html`:
```html
<option value="gaming">Gaming</option>
```

2. Add products with that category in `script.js`

### Styling

Modify `style.css` to change:
- Color scheme (gradient colors, button colors)
- Card layouts
- Font sizes and families
- Spacing and padding

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Future Enhancements

Potential features to add:
- Search functionality
- Multiple category selection
- Price range (min and max)
- Stock availability filter
- Add to cart functionality
- Favorite/wishlist feature
- Pagination for large product lists
- Product detail modal
- LocalStorage for saved filters

## License

Free to use for personal and commercial projects.
