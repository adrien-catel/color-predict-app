export const IsMorning = function(date) {
    var time = date.getHours();
    return time < 10;
}