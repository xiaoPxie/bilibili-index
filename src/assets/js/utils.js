// 数字转换
export function numberFormat (value) {
  let param = {};
  let k = 10000,
    sizes = ['', '万', '亿', '万亿'],
    i;
  if(value < k){
    param.value = value
    param.unit=''
  }else{
    i = Math.floor(Math.log(value) / Math.log(k));

    param.value = ((value / Math.pow(k, i))).toFixed(2);
    param.unit = sizes[i];
  }
  return param;
}
