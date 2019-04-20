import Vue from 'vue';
import moment from 'moment';

moment.locale('zh-cn');

Vue.filter('date', (value: any) => {
  return moment(value)
    .startOf('hour')
    .fromNow();
});

Vue.filter('formatdate', (value: any, formatString: any) => {
  formatString = formatString || 'YYYY-MM-DD HH:mm';
  return moment(value).format(formatString);
});
