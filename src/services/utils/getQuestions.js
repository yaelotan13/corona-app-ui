const getQuestions = (t) => {
    return [
      {
        body: t('cough'),
        type: 'rate',
        name: 'cough'
      },
      {
        body: t('shortness of breath'),
        type: 'rate',
        name: 'shortnessOfBreath'
      },
      {
        body: t('trouble breathing'),
        type: 'rate',
        name: 'troubleBreathing'
      },
      {
        body: t('chest pain'),
        type: 'rate',
        name: 'painInChest'
      },
      {
        body: t('confusion'),
        type: 'rate',
        name: 'confusion'
      },
      {
        body: t('loss of smell'),
        type: 'rate',
        name: 'lossOfSmell'
      },
      {
        body: t('loss of taste'),
        type: 'rate',
        name: 'lossOfTaste'
      },
      {
        body: t('blue lips'),
        type: 'boolean',
        name: 'blueLips'
      },
      {
        body: t('confirmed corona'),
        type: 'boolean',
        name: 'confirmedCorona'
      },
    ];
  } 
  
  export default getQuestions;
  