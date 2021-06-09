// Validate for duplicates

async function existsForm(cc) {
  const isCcValidate = validator.validText.validator(cc);
  if (!isCcValidate) {
    return Promise.reject({ ...exceptions.INVALID_FIELD, details: "cc" });
  }

  return Forms.aggregate([
    {
      $match: {
        cc: { $eq: cc },
      },
    },
  ])
    .count("count")
    .then((result) => {
      if (result.length === 0) return Promise.resolve(true);
      const [{ count }] = result;
      console.log(count);
      console.log(result);

      const isExists = count > 0;
      if (isExists){
        alert("Este elemento ya existe ne la base de datos")
        return Promise.reject({ ...exceptions.EXISTS_DATA });
      } 
    })
    .catch((error) => Promise.reject(error));
}

module.exports = existsForm;
