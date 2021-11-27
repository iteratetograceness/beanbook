import { createServer } from 'http';
import pkg from '../pages/api/graphql.js';
const { getEnveloped } = pkg;

const httpServer = createServer();

httpServer.on('request', async (req, res) => {
  // Here you get the alternative methods that are bundled with your plugins
  // You can pass anything from your incoming request to make it available
  // for Envelop plugins, and to make it available as part of your
  // GQL execution context
  const { parse, validate, contextFactory, execute, schema } = getEnveloped({ req });

  // Parse the initial request and validate it
  const { query, variables } = JSON.parse(req.payload);
  const document = parse(query);
  const validationErrors = validate(schema, document);

  if (validationErrors.length > 0) {
    return res.end(JSON.stringify({ errors: validationErrors }));
  }

  // Build the context and execute
  const contextValue = await contextFactory();
  const result = await execute({
    document,
    schema,
    variableValues: variables,
    contextValue,
  });

  // Send the response
  res.end(JSON.stringify(result));
});

httpServer.listen(9000);