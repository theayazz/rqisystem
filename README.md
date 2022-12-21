//filter

      const { queryString } = req.query;
    const queryKeys = Object.keys(queryString);
    const query = {};
    queryKeys?.forEach((key) => {
      if (queryString[key]) {
        query[key] = { [Op.eq]: `${queryString[key]}` };
      }
    });
    const results = await model.findAndCountAll({
      include: [{ all: true }],
      order: [['createdAt', 'DESC']],
      where: query,
    });
    const result = results.rows?.map((t) => t.get({ plain: true })).map((x) => x);
    return result;

    //sort

const sort = req.query.sort;
const order = req.query.order;
const results = await model.findAndCountAll({
include: [{ all: true }],
order: [[sort, order]],
});
const result = results.rows?.map((t) => t.get({ plain: true })).map((x) => x);
return result;

//paginate
const pageAsNumber = Number.parseInt(req.query.page);
const size = 6;
let page = 1;
if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
page = pageAsNumber;
}
const results = await model.findAndCountAll({
include: [{ all: true }],
order: [['createdAt', 'DESC']],
limit: parseInt(size),
offset: parseInt((page - 1) _ size),
});
const result = results.rows?.map((t) => t.get({ plain: true })).map((x) => x);
return {
content: result,
current: parseInt(page),
totalPages: Math.floor(results.count / size / 1.837), //bu hesablamaya sonra baxmaq lazimdir
totalRecords: Math.floor(results.count / 1.844), //bu hesablamaya sonra baxmaq lazimdir
size: size,
from: (page - 1) _ size + 1,
to:
page _ size > Math.floor(results.count / 1.844)
? Math.floor(results.count / 1.844)
: (page - 1) _ size + size,
};
}

//8000
 const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj, '++++++++++++++++');
    let queryStrr = JSON.stringify(queryObj);
    let queryStr = queryStrr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log(queryStr, 'first');
    const queryDump = await model.findAndCountAll({
      include: [{ all: true }],
      where: JSON.parse(queryStr) || {},
    });
    const query = queryDump?.rows?.map((t) => t.get({ plain: true })).map((x) => x);
    return query;
  }
