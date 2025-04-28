
function ageClassification(num) {
    return num < 0 ? null :
      num <= 24 ? 'Дитинство' :
        num <= 44 ? 'Молодість' :
          num <= 65 ? 'Зрілість' :
            num <= 75 ? 'Старість' :
              num <= 90 ? 'Довголіття' :
                num <= 122 ? 'Рекорд' : null
  }

  /*
console.log('    -1 :', ageClassification(-1)) // -1 : null
console.log('     0 :', ageClassification(0)) // 0 : null
console.log('     1 :', ageClassification(1)) // 1 : Дитинство
console.log('    24 :', ageClassification(24)) // 24 : Дитинство
console.log(' 24.01 :', ageClassification(24.01)) // 24.01 : Молодість
console.log('    44 :', ageClassification(44)) // 44 : Молодість
console.log(' 44.01 :', ageClassification(44.01)) // 44.01 : Зрілість
console.log('    65 :', ageClassification(65)) // 65 : Зрілість
console.log('  65.1 :', ageClassification(65.1)) // 65.1 : Старість
console.log('    75 :', ageClassification(75)) // 75 : Старість
console.log(' 75.01 :', ageClassification(75.01)) // 75.01 : Довголіття
console.log('    90 :', ageClassification(90)) // 90 : Довголіття
console.log(' 90.01 :', ageClassification(90.01)) // 90.01 : Рекорд
console.log('   122 :', ageClassification(122)) // 122 : Рекорд
console.log('122.01 :', ageClassification(122.01)) // 122.01 : null
console.log('   150 :', ageClassification(150)) // 150 : null
*/

export {ageClassification};