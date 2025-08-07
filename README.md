FakeStore App
This is a React application that interacts with the FakeStoreAPI to simulate a simple e-commerce platform. Users can view, add, edit, and delete products. The app is styled using React Bootstrap and uses React Router for navigation.

Features

Home Page
  Displays a welcome message
  Button to navigate to the Product Listing page

Product Listing Page

  Fetches and displays products from FakeStoreAPI
  Each product shows an image, title, price, and a link to view details

Product Details Page

  Shows full product information: image, title, description, category, and price
  Includes buttons to add to cart and delete the product
  Uses URL parameters to fetch product by ID
  Handles loading and error states

Add Product Page

  Form to add a new product via POST request
  Fields: title, price, description, category
  Confirmation message shown after submission

Edit Product Page
  Pre-filled form to update product data via PUT request
  Shows a success message after update

Delete Product

  Deletes a product using DELETE request
  Confirmation modal before deleting
  Redirects to product listing after deletion

Navigation
  
  React Bootstrap Navbar present across all pages
  Links to Home, Product Listing, and Add Product
  Mobile responsive
