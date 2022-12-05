import moment from 'moment'
export let time = {
    getDateTimeNow(num) {
        // 获取当前时间
        var time = new Date();
        var day = ("0" + time.getDate()).slice(-2)
        var month = ("0" + (time.getMonth() + 1)).slice(-2)

        var hour = ("0" + time.getHours()).slice(-2)
        var minute = ("0" + time.getMinutes()).slice(-2)
        var second = ("0" + time.getSeconds()).slice(-2)

        var today = "";
        if (num == 0) {
            today = time.getFullYear() + "-" + (month) + "-" + (day) + " " + (hour) + ":" + (minute) + ":" + second
        } else {
            today = time.getFullYear() + "-" + (month) + "-" + (day);
        }

        return today
    },
    convertDate(date, num) {
        // 格式化时间
        let d = new Date(date); //传入时间
        let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        let times = ""
        if (num == 0) {
            times = d.getFullYear() + '-' + month + '-' + day + " " + hours + ':' + min + ':' + sec;
        } else {
            times = d.getFullYear() + '-' + month + '-' + day;
        }
        return times;

    },
    //获取近N月时间
    getRecentMonth: function(n) {
        let month = moment(new Date()).subtract(n, 'months').format('YYYY-MM-DD');
        return month;
    },
    // 获取近N天时间
    getRecentDay: function(n) {
        let day = moment(new Date()).subtract(n, 'days').format('YYYY-MM-DD');
        return day;
    },
}