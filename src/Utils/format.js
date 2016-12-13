import toMoment from './toMoment'

const CONFIG = {
  // the format in which days should be displayed in month view
  dayFormat: 'D',

  // the format in which months should be displayed in year view
  monthFormat: 'MM',

  // the format in which years should be displayed in decade view
  yearFormat: 'YYYY',
  
  fullFormat: 'YYYYMMDD'
  
}

const f = (mom, format) => toMoment(mom).format(format);

export default {

  day(mom, format = CONFIG.dayFormat) {
    return f(mom, format)
  },

  month(mom, format =  CONFIG.monthFormat) {
    return f(mom, format)
  },

  year(mom, format = CONFIG.yearFormat) {
    return f(mom, format)
  },
  
  full(mom, format = CONFIG.fullFormat){
    return f(mom, format)
  
  }
}
