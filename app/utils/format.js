import moment from 'moment'
moment.locale('zh-cn');

const format = {
  numberic: function(v){
    var med,
      tmp_value,
      out_value = parseFloat(v);
    if (isNaN(out_value) || out_value === 0) {
      return "0.00";
    }
    med = 0;
    do{
      med += 2;
      tmp_value = out_value.toFixed(med);
    }while(parseFloat(tmp_value) === 0 && med < 6);
    out_value = tmp_value
    return out_value.toString().replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
  },
  timestamp:(v) => {
    return moment(v).valueOf()
  }
}

export default format
