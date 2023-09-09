import React, { useState } from 'react';
import moment from 'moment';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateFilter() {
  const [startDate, setStartDate] = useState(moment().toDate());
  const [endDate, setEndDate] = useState(moment().add(1, 'year').toDate());

  const [dropdown1Value, setDropdown1Value] = useState('All');
  const [dropdown2Value, setDropdown2Value] = useState('Sunday');
  const [dropdown3Value, setDropdown3Value] = useState('Month');
  const [filterDate, setFilterDate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filterDate.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(filterDate.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const handleDropdown1Change = (e) => {
    setDropdown1Value(e.target.value);
  };

  const handleDropdown2Change = (e) => {
    setDropdown2Value(e.target.value);
  };

  const handleDropdown3Change = (e) => {
    setDropdown3Value(e.target.value);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const generateDates = () => {
    const results = [];
    const current = moment(startDate);
    const end = moment(endDate);

    if (dropdown1Value === 'All' && dropdown3Value === 'Month') {
      while (current.isSameOrBefore(end)) {
        if (current.format('dddd') === dropdown2Value) {
          results.push(current.format('MMMM D, YYYY'));
        }
        current.add(1, 'day');
      }
    } else if (
      dropdown1Value &&
      (dropdown3Value === 'Month' || dropdown3Value === 'Week')
    ) {
      while (current.isSameOrBefore(end)) {
        if (current.format('dddd') === dropdown2Value) {
          switch (dropdown1Value) {
            case '1':
              if (current.date() <= 7) {
                results.push(current.format('MMMM D, YYYY'));
              }
              break;
            case '2':
              if (current.date() >= 8 && current.date() <= 14) {
                results.push(current.format('MMMM D, YYYY'));
              }
              break;
            case '3':
              if (current.date() >= 15 && current.date() <= 21) {
                results.push(current.format('MMMM D, YYYY'));
              }
              break;
            case '4':
              if (current.date() >= 22 && current.date() <= 28) {
                results.push(current.format('MMMM D, YYYY'));
              }
              break;
            case '5':
              if (current.date() >= 29 && current.date() <= 4) {
                results.push(current.format('MMMM D, YYYY'));
              }
              break;
          }
        }
        current.add(1, 'day');
      }
    }
    return results;
  };

  const handleSubmit = () => {
    let filteredDates = generateDates();
    setFilterDate(filteredDates);
  };

  return (
    <div id="outer">
      <h1>Date Picker</h1>
      <div id="main">
        <div id="calender">
          <DatePicker
            className="date-picker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            open={true}
            closeOnSelect={true}
          />
          <DatePicker
            className="date-picker"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            open={true}
            closeOnSelect={true}
          />
        </div>
        <div id="dropdowns">
          <select
            id="dropdown1"
            value={dropdown1Value}
            onChange={handleDropdown1Change}
            className="dropdown"
            // size="5"
          >
            <option value="All">All</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
          </select>
          <select
            value={dropdown2Value}
            className="dropdown"
            onChange={handleDropdown2Change}
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
          <select
            value={dropdown3Value}
            className="dropdown"
            onChange={handleDropdown3Change}
          >
            <option value="Month">Month</option>
            <option value="Week">Week</option>
          </select>
        </div>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Dates</th>
              </tr>
            </thead>
            <tbody>
              {records.map((date, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="navbar">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prePage}>
                  Prev
                </a>
              </li>
              {numbers.map((n, i) => {
                return (
                  <li
                    className={`page-item  ${
                      currentPage === n ? 'actice' : ''
                    }`}
                    key={i}
                  >
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => changeCPage(n)}
                    >
                      {n}
                    </a>
                  </li>
                );
              })}

              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default DateFilter;
