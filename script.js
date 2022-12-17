function reverseStr(str){
    var listOfChars = str.split(''); // ['a','r','t',....]
    var reverseListOfChars = listOfChars.reverse();

    var reversedStr = reverseListOfChars.join('');

    return reversedStr;

    //return str.split('').reverse('').join('');
}

//console.log(reverseStr('Hello'));

function isPalindrome(str){
    var reverse = reverseStr(str);
    return (str === reverse);
    // if (reverse === str) {
    //  return true;
    // }
    // return false;

// console.log(isPalindrome('242'));
// console.log(isPalindrome('oppo'));
// console.log(isPalindrome('Rohit'));
// console.log(isPalindrome('mom'));
}

function convertDateToStr(date){
    
    var dateStr = {day:'', month:'', year:''};
    if (date.day < 10){
        dateStr.day = '0'+ date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if (date.month < 10){
        dateStr.month = '0'+ date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
    

// // var date = {
// //     day: 5,
// //     month: 7,
// //     year: 2020
// }
}

//console.log(convertDateToStr(date));

function getALlDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return[ddmmyyy, mmddyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date){
    var listOfPalindromes  = getALlDateFormats(date);

    var flag = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }    

        return flag;
    }
}

//check leap year
function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

//get next date
function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]; 
    // 0-11
    if (month === 2){

        //Check for February
        if (isLeapYear(year)) {
            if(day > 29){
                day = 1;
                month++;
            }
            else{
                if (day > 28){
                    day = 1;
                    month++; 
                }
            }
        }
        //check for other months
        else{
            //Check if the day exceeds the max days in month 
            if (day > daysInMonth[month - 1]){
                day = 1;
                month++;
            }
            if (month > 12){
                month = 1;
                year++;
            }
            return {
                day: day,
                month: month,
                year: year
            }
        } 
    }

}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
        if (isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

// var date = {
//     day: 31,
//     month: 12,
//     year: 2020 
// }

//console.log(getNextPalindromeDate(date));

var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');

function clickHandler(e){
    console.log(dateInputRef.value)

    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-');
        var date = { 
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllFormats(date);
        if(isPalindrome)
            resultRef.innerText = 'Yep!! Your Birthday is Palindrome !'
    } else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
        resultRef.innerText = 'The next Palindrome is  ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days'
    }
}
showBtnRef.addEventListener('cleck', clickHandler);
