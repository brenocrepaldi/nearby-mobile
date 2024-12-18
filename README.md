
# Nearby

**Nearby** is a mobile application designed to help users access exclusive coupons from nearby businesses, enhancing local shopping experiences and providing valuable discounts.

## Features

- **Discover Nearby Offers**: Automatically find and display coupons for stores and services close to your location.
- **Easy Access**: Browse and redeem coupons with a simple and intuitive interface.
- **Location Integration**: Seamless integration with your device's GPS to display the most relevant nearby deals.
- **User-Friendly Design**: A clean and responsive UI that prioritizes simplicity and ease of use.

## Technologies Used

- **React Native**: For cross-platform mobile app development.
- **Node.js**: Backend server to manage data and API endpoints.
- **Express**: For building the RESTful API.
- **Prisma**: Used to manage and interact with the database, providing efficient and type-safe data access for storing user and coupon information.
- **Google Maps API**: To determine and display nearby businesses based on geolocation.

## Installation

To run this project locally, follow these steps:

### Prerequisites
- Node.js
- npm or yarn

### Steps
1. **Clone the repositories**:
   ```bash
   git clone https://github.com/brenocrepaldi/nearby-mobile.git
   cd nearby-mobile
   ```
   ```bash
   git clone https://github.com/brenocrepaldi/nearby-backend.git
   cd nearby-backend
   ```
2. **Install dependencies in both repositories**:
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```
4. **Run the mobile app**:
   - Install Expo CLI if needed:
     ```bash
     npm install -g expo-cli
     ```
   - Start the Expo server:
     ```bash
     npx expo start
     ```
   - Scan the QR code using the Expo Go app (available for iOS and Android) to test on a mobile device.

## Project Structure

```plaintext
nearby-mobile/
│
├── src/              # React Native app code
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

```plaintext
nearby-backend/
│
├── prisma/           # Database 
├── src/              # NodeJS source code
├── .env              # Enviroment Variables
├── package.json      # Project dependencies
```

## How It Works

1. **User Location**: The app fetches your geolocation using your device GPS.
2. **Fetch Nearby Coupons**: The backend searches for coupons related to stores or businesses within a specified radius.
3. **Display Deals**: The app lists available offers with descriptions, expiration dates, and redemption instructions.
4. **Redeem Coupons**: Users can save or redeem coupons directly from the app.

## Future Enhancements

- **Push Notifications**: Notify users about new deals in their area.
- **Personalized Recommendations**: Suggest coupons based on user preferences.
- **User Accounts**: Allow users to save favorite coupons and track their redemptions.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, feel free to reach out:
- **Email**: brenogaia2004@gmail.com
- **GitHub**: [brenocrepaldi](https://github.com/brenocrepaldi)

---

Enjoy discovering and saving with **Nearby**! 🛍️🎟️
