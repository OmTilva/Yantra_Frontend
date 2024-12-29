// Updater.jsx
import React from "react";
import "./Updater.css";

function Updater() {
  return (
    <div className="updater-container">
      <main className="content">
        <h1>STOCK UPDATER</h1>

        <section className="single-stock">
          <h2>Update Single Stock</h2>
          <div className="form-group">
            <select>
              <option disabled selected>Select a stock</option>
              <option>Stock 1</option>
              <option>Stock 2</option>
              <option>Stock 3</option>
              <option>Stock 4</option>
              <option>Stock 5</option>
              <option>Stock 6</option>
              <option>Stock 7</option>
              <option>Stock 8</option>
              <option>Stock 9</option>
              <option>Stock 10</option>
              <option>Stock 11</option>
              <option>Stock 12</option>
              <option>Stock 13</option>
              <option>Stock 14</option>
              <option>Stock 15</option>
              <option>Stock 16</option>
              <option>Stock 17</option>
              <option>Stock 18</option>
              <option>Stock 19</option>
              <option>Stock 20</option>
              <option>Stock 21</option>
              <option>Stock 22</option>
              <option>Stock 23</option>
              <option>Stock 24</option>
              <option>Stock 25</option>
            </select>
            <select>
              <option disabled selected>Select Update Option</option>
              <option>By Value</option>
              <option>By Percentage</option>
            </select>
            <select>
              <option disabled selected>Select to Increase or Dicrease</option>
              <option>Increase</option>
              <option>Decrease</option>
            </select>
          </div>
          <input type="text" placeholder="Enter Value" className="placeholder"/>
          <button>Update Stock</button>
        </section>

        <section className="whole-market">
          <h2>Update Whole Market</h2>
          <input type="text" placeholder="Enter Percentage" className="placeholder"/>
          <div className="form-group">
            <select>
              <option disabled selected>Select to Increase or Decrease</option>
              <option>Increase</option>
              <option>Decrease</option>
            </select>
            <button>Update Market</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Updater;
