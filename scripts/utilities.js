import Filter from 'bad-words'

const filter = new Filter()

module.exports.defaultValues = (data, name) => {
    const value = data[name] ? filter.clean(data[name]) : null;
    return value;    
} 