const {
  parse,
  validate,
  execute,
} = require('graphql');
const { applyMiddleware } = require('graphql-middleware');

const loggingMiddleware = async (resolve, root, args, context, info) => {
  const startTime = Date.now();
  const result = await resolve(root, args, context, info);
  const endTime = Date.now();
  const duration = endTime - startTime;
  const resolverData = {
    parentType: info.parentType,
    fieldName: info.fieldName,
    startTime,
    endTime,
    duration,
    returnValue: result,
  };
  context.push(resolverData);
  //console.log(resolverData);
  return result;
}

export async function goTrace(schema, query) {
  schema = applyMiddleware(schema, loggingMiddleware);

  const queryAST = parse(query);

  // Validate the incoming queryAST against the GraphQLSchema Object
  const errors = validate(schema, queryAST);
  if (errors.length === 0) {
    console.log(`Validation successful query can be executed`);  
  } else {
    console.log(`Error during validation: ${JSON.stringify(errors)}`); 
    //! send to error log   
  }

  // build data obj 
  const data = {};
  const resolverData = [];
  data.startTime = Date.now();

  // Execute the query against the schema
  let response;
  await execute(schema, queryAST, null, resolverData)
    .then(result => console.log(`Execution result: \n${JSON.stringify(result)}`))
    .then(() => console.log(resolverData))
    .catch(err => console.log(err));

  data.endTime = Date.now();
  data.duration = data.endTime - data.startTime;
  console.log('Overall metrics: ', data);
  
  return response;
}