'use strict'

const Blockly = require('blockly/blockly_compressed')

const {
  ORDER_NONE,
  Messages
} = require('./helpers')

/**
 * Lookup table for message strings.
 */
const MESSAGES = {
  absent: {
    message0: {
      en: 'Absent', 
      es: 'Ausente'
    },
    tooltip: {
      en: 'represent a hole', 
      es: 'representa un agujero'
    }
  },
  column: {
    column: {
      en: 'column', 
      es: 'columna'
    },
    tooltip: {
      en: 'get the value of a column',
      es: 'obten el valor de una columna'
    }
  },
  datetime: {
    text: {
      en: 'YYYY-MM-DD',
      es: 'AAAA-MM-DD' 
    },
    tooltip: {
      en: 'constant date/time',
      es: 'constante fecha/tiempo'
    }
  },
  logical: {
    tooltip: {
      en: 'logical constant', 
      es: 'constante logica'
    }
  },
  number: {
    tooltip: {
      en: 'constant number',
      es: 'numbero constante'
    }
  },
  text: {
    text: {
      en: 'text',
      es: 'texto'
    },
    tooltip: {
      en: 'constant text', 
      es: 'texto constante'
    }
  },
  rownum: {
    message0: {
      en: 'Row number',
      es: 'Numero de fila'
    },
    tooltip: {
      en: 'row number',
      es: 'numero de fila'
    }
  },
  exponential: {
    message0: {
      en: 'Exponential \u03BB %1',
      es: 'Exponencial \u03BB %1'
    },
    tooltip: {
      en: 'exponential random value',
      es: 'valor aleatorio exponencial'
    }
  },
  normal: {
    message0: {
      en: 'Normal \u03BC %1 \u03C3 %2',
      es: 'Normal \u03BC %1 \u03C3 %2'
    },
    tooltip: {
      en: 'normal random value',
      es: 'valor aleatorio normal'
    }
  },
  uniform: {
    message0: {
      en: 'Uniform \u03B1 %1 \u03B2 %2', 
      es: 'Uniforme \u03B1 %1 \u03B2 %2'
    },
    tooltip: {
      en: 'uniform random value', 
      es: 'valor aleatorio uniforme'
    }
  }
}

/**
 * Define value blocks.
 * @param {string} language Two-letter language code to use for string lookups.
 */
const setup = (language) => {
  const msg = new Messages(MESSAGES, language, 'en')
  Blockly.defineBlocksWithJsonArray([
    // Absent value
    {
      type: 'value_absent',
      message0: msg.get('absent.message0'),
      args0: [],
      output: 'String',
      style: 'value_block',
      helpUrl: '',
      tooltip: msg.get('absent.tooltip')
    },

    // Column name
    {
      type: 'value_column',
      message0: '%1',
      args0: [{
        type: 'field_input',
        name: 'COLUMN',
        text: msg.get('column.column')
      }],
      output: 'String',
      style: 'value_block',
      helpUrl: '',
      tooltip: msg.get('column.tooltip'),
      extensions: ['validate_COLUMN']
    },

    // Datetime
    {
      type: 'value_datetime',
      message0: '%1',
      args0: [{
        type: 'field_input',
        name: 'DATE',
        text: msg.get('datetime.text')
      }],
      output: 'DateTime',
      style: 'value_block',
      helpUrl: '',
      tooltip: msg.get('datetime.tooltip'),
      extensions: ['validate_DATE']
    },

    // Logical
    {
      type: 'value_logical',
      message0: '%1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'VALUE',
          options: [
            ['true', 'true'],
            ['false', 'false']
          ]
        }
      ],
      output: 'Boolean',
      helpUrl: '',
      style: 'value_block',
      tooltip: msg.get('logical.tooltip')
    },

    // Number
    {
      type: 'value_number',
      message0: '%1',
      args0: [{
        type: 'field_number',
        name: 'VALUE',
        value: 0
      }],
      output: 'Number',
      helpUrl: '',
      style: 'value_block',
      tooltip: msg.get('number.tooltip')
    },

    // Text
    {
      type: 'value_text',
      message0: '%1',
      args0: [
        {
          type: 'field_input',
          name: 'VALUE',
          text: msg.get('text.text')
        }
      ],
      output: 'String',
      style: 'value_block',
      helpUrl: '',
      tooltip: msg.get('text.tooltip')
    },

    // Row number
    {
      type: 'value_rownum',
      message0: msg.get('rownum.message0'),
      args0: [],
      output: 'String',
      style: 'value_block',
      helpUrl: '',
      tooltip: msg.get('rownum.tooltip')
    },

    // Exponential random variable
    {
      type: 'value_exponential',
      message0: msg.get('exponential.message0'),
      args0: [
        {
          type: 'field_input',
          name: 'RATE',
          text: '1.0'
        }
      ],
      output: 'Number',
      style: 'value_block',
      helpUrl: '',
      tooltip: msg.get('exponential.tooltip'),
      extensions: ['validate_RATE']
    },

    // Normal random variable
    {
      type: 'value_normal',
      message0: msg.get('normal.message0'),
      args0: [
        {
          type: 'field_input',
          name: 'MEAN',
          text: '0'
        },
        {
          type: 'field_input',
          name: 'STDDEV',
          text: '1'
        }
      ],
      output: 'Number',
      style: 'value_block',
      helpUrl: '',
      tooltip: msg.get('normal.tooltip'),
      extensions: ['validate_STDDEV']
    },

    // Uniform random variable
    {
      type: 'value_uniform',
      message0: msg.get('uniform.message0'),
      args0: [
        {
          type: 'field_input',
          name: 'LOW',
          text: '0'
        },
        {
          type: 'field_input',
          name: 'HIGH',
          text: '1'
        }
      ],
      output: 'Number',
      style: 'value_block',
      helpUrl: '',
      tooltip: msg.get('uniform.tooltip')
    }
  ])

  // Absent value
  Blockly.TidyBlocks['value_absent'] = (block) => {
    const code = `["@value", "absent"]`
    return [code, ORDER_NONE]
  }

  // Column name
  Blockly.TidyBlocks['value_column'] = (block) => {
    const column = block.getFieldValue('COLUMN')
    const code = `["@value", "column", "${column}"]`
    return [code, ORDER_NONE]
  }

  // Datetime
  Blockly.TidyBlocks['value_datetime'] = (block) => {
    const value = block.getFieldValue('DATE')
    const code = `["@value", "datetime", "${value}"]`
    return [code, ORDER_NONE]
  }

  // Logical
  Blockly.TidyBlocks['value_logical'] = (block) => {
    const value = block.getFieldValue('VALUE')
    const code = `["@value", "logical", ${value}]`
    return [code, ORDER_NONE]
  }

  // Number
  Blockly.TidyBlocks['value_number'] = (block) => {
    const value = parseFloat(block.getFieldValue('VALUE'))
    const code = `["@value", "number", ${value}]`
    return [code, ORDER_NONE]
  }

  // Text
  Blockly.TidyBlocks['value_text'] = (block) => {
    const value = block.getFieldValue('VALUE')
    const code = `["@value", "text", "${value}"]`
    return [code, ORDER_NONE]
  }

  // Row number
  Blockly.TidyBlocks['value_rownum'] = (block) => {
    const code = `["@value", "rownum"]`
    return [code, ORDER_NONE]
  }

  // Exponential random variable
  Blockly.TidyBlocks['value_exponential'] = (block) => {
    const rate = parseFloat(block.getFieldValue('RATE'))
    const code = `["@value", "exponential", ${rate}]`
    return [code, ORDER_NONE]
  }

  // Normal random variable
  Blockly.TidyBlocks['value_normal'] = (block) => {
    const mean = parseFloat(block.getFieldValue('MEAN'))
    const variance = parseFloat(block.getFieldValue('STDDEV'))
    const code = `["@value", "normal", ${mean}, ${variance}]`
    return [code, ORDER_NONE]
  }

  // Uniform random variable
  Blockly.TidyBlocks['value_uniform'] = (block) => {
    const low = parseFloat(block.getFieldValue('LOW'))
    const high = parseFloat(block.getFieldValue('HIGH'))
    const code = `["@value", "uniform", ${low}, ${high}]`
    return [code, ORDER_NONE]
  }
}

module.exports = {
  setup
}
