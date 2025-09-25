import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import CropGuidance from "./pages/CropGuidance";
import WeatherUpdates from "./pages/WeatherUpdates";
import StorageMarket from "./pages/StorageMarket";
import AIAssistant from "./pages/AIAssistant";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <LanguageProvider>
        <BrowserRouter>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/schemes" element={<GovernmentSchemes />} />
              <Route path="/crop-guidance" element={<CropGuidance />} />
              <Route path="/weather" element={<WeatherUpdates />} />
              <Route path="/storage-market" element={<StorageMarket />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;