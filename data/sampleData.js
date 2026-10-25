// data/sampleData.js
// This file contains beginner-friendly sample data for our Smart Food Tracker app.
// In later phases of the project, this data will be loaded from a local SQLite database.

// Sample food categories matching the design wireframes
export const sampleCategories = [
  { id: 1, name: 'Dairy', count: 8 },
  { id: 2, name: 'Meat', count: 4 },
  { id: 3, name: 'Vegetables', count: 6 },
  { id: 4, name: 'Fruits', count: 3 },
  { id: 5, name: 'Bakery', count: 3 },
];

// Sample food items in inventory
export const sampleItems = [
  {
    id: 1,
    name: 'Yogurt',
    category: 'Dairy',
    categoryId: 1,
    quantity: 1,
    unit: 'pcs',
    expiryDate: '25 Oct 2026',
    daysLeft: 2,
    barcode: '5 012345 678901',
    status: 'Active', // 'Active', 'Consumed', or 'Discarded'
  },
  {
    id: 2,
    name: 'Milk',
    category: 'Dairy',
    categoryId: 1,
    quantity: 2,
    unit: 'L',
    expiryDate: '26 Oct 2026',
    daysLeft: 3,
    barcode: '5 012345 678900',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Bread',
    category: 'Bakery',
    categoryId: 5,
    quantity: 1,
    unit: 'loaf',
    expiryDate: '26 Oct 2026',
    daysLeft: 3,
    barcode: '5 012345 678902',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Chicken',
    category: 'Meat',
    categoryId: 2,
    quantity: 500,
    unit: 'g',
    expiryDate: '27 Oct 2026',
    daysLeft: 4,
    barcode: '5 012345 678903',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Spinach',
    category: 'Vegetables',
    categoryId: 3,
    quantity: 1,
    unit: 'pack',
    expiryDate: '29 Oct 2026',
    daysLeft: 6,
    barcode: '5 012345 678904',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Apples',
    category: 'Fruits',
    categoryId: 4,
    quantity: 6,
    unit: 'pcs',
    expiryDate: '02 Nov 2026',
    daysLeft: 10,
    barcode: '5 012345 678905',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Cheddar Cheese',
    category: 'Dairy',
    categoryId: 1,
    quantity: 200,
    unit: 'g',
    expiryDate: '20 Oct 2026',
    daysLeft: -1, // Expired
    barcode: '5 012345 678906',
    status: 'Discarded',
  },
];

// Sample notifications for expiry alerts
export const sampleNotifications = [
  {
    id: 1,
    title: 'Milk expires tomorrow',
    time: '9:00 AM',
    section: 'Today',
    isRead: false,
  },
  {
    id: 2,
    title: 'Yogurt expires in 2 days',
    time: '9:00 AM',
    section: 'Today',
    isRead: false,
  },
  {
    id: 3,
    title: 'Chicken expires in 3 days',
    time: '8:30 AM',
    section: 'Today',
    isRead: true,
  },
  {
    id: 4,
    title: 'Bread has expired',
    time: 'Yesterday',
    section: 'Earlier',
    isRead: true,
  },
  {
    id: 5,
    title: 'Cheese expires in 5 days',
    time: '21 Oct',
    section: 'Earlier',
    isRead: true,
  },
];

// Sample waste statistics
export const sampleStats = {
  consumed: 18,
  discarded: 6,
  wasteRate: '25%',
  weeklyData: [
    { label: 'W1', value: 5 },
    { label: 'W2', value: 8 },
    { label: 'W3', value: 4 },
    { label: 'W4', value: 7 },
  ],
};
