const form = document.querySelector("#form");
const result = document.querySelector("#result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (form.date.value == "") {
    result.innerText = "Enter your date of birth";
  } else {
    const date = form.date.value;
    if (palindromeListChecker(dateFormatsList(date.split("-")))) {
      result.innerText = "Yehh!!! Its a palindrome!!!";
    } else {
      const palindromedate = nearestPlaidromeFinder(date);
      if (palindromedate[1] == 1) {
        result.innerText = `Nearest palindrome is ${palindromedate[0]} , you missed it by ${palindromedate[1]} days`;
      } else {
        result.innerText = `Nearest palindrome is ${palindromedate[0]} , you missed it by ${palindromedate[1]} days`;
      }
    }
  }
});

const dateFormatsList = (date) => {
  var ddmmyyyy = `${date[2]}${date[1]}${date[0]}`;
  var mmddyyyy = `${date[1]}${date[1]}${date[0]}`;
  var yyyymmdd = `${date[0]}${date[1]}${date[2]}`;
  var ddmmyy = `${date[2]}${date[1]}${date[0].slice(2)}`;
  var mmddyy = `${date[1]}${date[2]}${date[0].slice(2)}`;
  var yymmdd = `${date[0].slice(2)}${date[1]}${date[2]}`;

  var dateList = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  return dateList;
};

const palindromeListChecker = (dateList) => {
  for (date of dateList) {
    if (palindromeStrChecker(date)) {
      return true;
    }
  }
  return false;
};

const palindromeStrChecker = (date) => {
  for (let i = 0; i < date.length; i++) {
    if (date[i] != date[date.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

const getNextDate = (date) => {
  var today = new Date(date);
  var nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  return nextDay;
};

function dateToString(date) {
  if (date.getMonth() + 1 < 10 && date.getDate() < 10) {
    return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`;
  } else if (date.getMonth() + 1 < 10) {
    return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
  } else if (date.getDate() < 10) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-0${date.getDate()}`;
  } else {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}

const nearestPlaidromeFinder = (date) => {
  for (let i = 1; i > 0; i++) {
    date = getNextDate(date);
    dateStr = dateToString(date);
    if (palindromeListChecker(dateFormatsList(dateStr.split("-")))) {
      return [dateStr, i];
    }
  }
};
