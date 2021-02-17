import logo from './moon.svg';
import './Wellcome.css';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import LoginPage from '../Login-page'
  
function WellCome() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Một ngày tuyệt vời phải không nào? Hày cùng xem hôm nay bạn có việc gì cần làm nhé!
        </p>
        <Router>
      <div>
        <ul>
          <li>
            <LoginPage />
          </li>
        </ul>
      </div>
    </Router>
      </header>
    </div>
  );
}

export default WellCome;
