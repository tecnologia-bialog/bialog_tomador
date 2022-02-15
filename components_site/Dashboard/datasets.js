
export function make_data(data_,label='Assinaturas',bgColor="rgba(75,192,192,0.4)", borderColor="rgba(75,192,192,1)") {


    let item =   {
          label: label,
          fill: true,
          lineTension: 0.1,
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: borderColor,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: bgColor,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data_
    }

    return item;

 }
