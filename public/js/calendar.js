const $ = require('jquery');
require('fullcalendar');
const moment = require('moment');
const months = [];
const defferedAjax = [];
const events = [];
let calendar;

let calendarDate, thisMonth, thisYear, thisDay;

$(function () {
    calendar = $('#calendar');
    $('#decrease').click(decreaseMonth);
    $('#increase').click(advanceMonth);
    initMonth();
    initEvents();
});

function getMonthYear(month, year) {
    let date = new Date(year, month - 1, 1);

    return {month: (date.getMonth() + 1), year: date.getFullYear()};
}

async function initEvents() {
    for (let j = thisMonth; j < thisMonth + 4; ++j) {
        let monthYear = getMonthYear(j, thisYear);

        const daysThisMonth = getDaysInMonth(monthYear.month, monthYear.year);
        for (let i = 1; i < daysThisMonth; ++i) {
            defferedAjax.push(
                $.ajax({
                    dataType: "json",
                    url: 'https://event-parking-api.herokuapp.com/event/' + monthYear.year + '/' + monthYear.month + '/' + i
                }).then(addEvents)
            );
        }

    }

    $.when.apply($, defferedAjax).then(() => {
        loadCalendar()
    });

    months.push(thisMonth);
}

function getDaysInMonth(month, year) {
    const date = new Date(year, month, 0);
    return date.getDate();
}

async function addEvents(data) {
    for (let i = 0; i < data.length; ++i) {
        events.push({
            title: data[i]['title'],
            start: data[i]['start_date'],
            end: data[i]['end_date'],
            url: data[i]['url'],
        });
    }
}

async function loadCalendar() {
    calendar.fullCalendar({
        defaultView: 'month',
        events: events,
        defaultDate: moment(thisYear + '-' + thisMonth + '-' + thisDay, "YYYY-M-D")
    });
}

function initMonth() {
    calendarDate = new Date(Date.now());
    updateDatePieces();
}

function advanceMonth() {
    calendar.fullCalendar('next');
}

function decreaseMonth() {
    calendar.fullCalendar('prev');
}

function updateDatePieces() {
    thisMonth = calendarDate.getMonth() + 1;
    thisYear = calendarDate.getFullYear();
    thisDay = calendarDate.getDate();
}
