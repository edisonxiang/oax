import {Contact, Info, License, Operation, Parameter, Path, Spec, Tag} from "swagger-schema-official";

interface X {
  [key: string]: any
}

interface IMeta {
  title?: string,
  icon: string,
  value?: string,
  link?: string
  download?: string,
  image?: string
}

interface IResource extends Tag {
  _operations?: OperationExtended[]
  _opened?: boolean
  _display?: boolean
}

const HttpMethods: { [httpMethod: string]: boolean } = {
  get: true,
  put: true,
  post: true,
  delete: true,
  options: true,
  head: true,
  patch: true
}

interface OperationExtended extends Operation {
  _id: number,
  _method: string,
  _pathName: string
  _display?: boolean
}

// interface SchemaExtended extends Schema {
//   _obj: any
// }

interface Map {
  [tag: string]: number
}

export class OAS {
  metas: IMeta[]
  resources: IResource[]
  map: Map

  constructor(spec: Spec,
              url: string,
              defaultContentType: string = 'application/json',
              validatorUrl: string = 'http://online.swagger.io/validator') {
    OAS.fixInfo(spec, url, defaultContentType)
    this.map = {}
    this.metas = OAS.getMeta(spec, url, validatorUrl)
    this.resources = OAS.getResources(spec, this.map)
    OAS.getOperations(spec, this.resources, this.map)
  }

  static openAll(resources: IResource[], opened = true) {
    for (const r in resources) {
      resources[r]._opened = opened
    }
  }

  static getSearch(text: string) {
    if (!text) {
      return {}
    } else {
      const trimmed = text.toLowerCase().trim();
      const parts = trimmed.split(' ');
      const isMethod = HttpMethods[parts[0]];
      const method = (parts.length > 1) ? parts[0] : (isMethod ? parts[0] : '');
      const path = (parts.length > 1) ? parts[1] : (isMethod ? '' : parts[0]);

      return {method, path}
    }
  }

  static filterSearch(resources: IResource[], search: any) {
    for (let i = 0; i < resources.length; i++) {
      let r = resources[i]

      r._display = false
      r._opened = false

      for (let j = 0; j < r._operations.length; j++) {
        let o = r._operations[j];

        if ((search.method ? search.method === o._method : true) &&
          (search.path ? o._pathName.toLowerCase().indexOf(search.path) > -1 : true)) {
          o._display = true
          r._display = true
          r._opened = true
        } else {
          o._display = false
        }
      }
    }
  }

  static fixInfo(spec: Spec, url: string, defaultContentType: string) {
    const a: any = document.createElement('a')
    a.href = url

    spec.schemes = spec.schemes || []

    if (spec.schemes.length === 0) {
      spec.schemes.push(a.protocol.replace(':', ''))
    }

    spec.host = spec.host || a.host
    spec.consumes = spec.consumes || [defaultContentType]
    spec.produces = spec.produces || [defaultContentType]
  }

  static getResources(spec: Spec, map: Map): IResource[] {
    const resources: IResource[] = []

    if (!spec.tags || (spec.tags.length === 0)) {
      resources.push({
        name: 'default',
        _opened: true,
        _display: true
      })
      map['default'] = 0;
    } else {
      for (let i = 0, l = spec.tags.length; i < l; i++) {
        let tag = spec.tags[i];
        (tag as IResource)._opened = true;
        (tag as IResource)._display = true;
        resources.push(tag)
        map[tag.name] = i
      }
    }

    return resources
  }

  static getOperations(spec: Spec, resources: IResource[], map: Map/*, form, map, defaultContentType, openPath*/) {
    let operationId: number = 0;

    for (const pathName in spec.paths) {
      const path: Path = spec.paths[pathName]
      // const pathParameters: Parameter[] = path.parameters || [];

      for (const httpMethod in path) {
        if (!HttpMethods[httpMethod]) {
          continue;
        }

        const operation: OperationExtended = (path as X)[httpMethod]

        operation._id = operationId;

        operation.produces = operation.produces || spec.produces;
        // form[operationId] = {
        //   responseType: defaultContentType
        // };

        operation._method = httpMethod;
        operation._pathName = pathName;
        operation._display = true;

        // parseParameters(spec, operation, pathParameters, form, defaultContentType);
        // OAS.parseResponses(spec, operation);

        operation.tags = (!operation.tags || !operation.tags.length) ? ['default'] : operation.tags;

        const tag = operation.tags[0];

        if (typeof map[tag] === 'undefined') {
          map[tag] = resources.length;
          resources.push({
            name: tag
          });
        }

        const resource: IResource = resources[map[operation.tags[0]]];

        // operation.open = openPath && openPath === operation.operationId || openPath === resource.name + '*';

        resource._operations = resource._operations || [];
        resource._operations.push(operation);

        // if (operation.open) {
        //   resource.open = true;
        // }

        operationId++;
      }
    }
  }

  static computeParameters(pathParameters: Parameter[], operation: OperationExtended): Parameter[] {
    let operationParameters: Parameter[] = operation.parameters || [];
    let parameters: Parameter[] = [].concat(operationParameters);

    for (let i = 0, l = pathParameters.length; i < l; i++) {
      let found: boolean = false;
      let pathParameter = pathParameters[i];

      for (let j = 0, k = operationParameters.length; j < k; j++) {
        let operationParameter = operationParameters[j]
        if (pathParameter.name === operationParameter.name && pathParameter.in === operationParameter.in) {
          // overridden parameter
          found = true;
          break;
        }
      }
      if (!found) {
        // add path parameter to operation ones
        parameters.push(pathParameter);
      }
    }
    return parameters;
  }

  static parseParameters(spec: Spec, operation: OperationExtended, pathParameters: Parameter[]/*, form, defaultContentType*/) {
    const parameters: Parameter[] = operation.parameters = OAS.computeParameters(pathParameters, operation);

    for (let i = 0, l = parameters.length; i < l; i++) {
      // TODO manage 'collectionFormat' (csv, multi etc.) ?
      // TODO manage constraints (pattern, min, max etc.) ?
      let param = parameters[i];
      // param.id = paramId;
      // param.type = model.getType(param);
      // param.description = trustHtml(param.description);

      // if (param.items && param.items.enum) {
      //   param.enum = param.items.enum;
      //   param.default = param.items.default;
      // }

      // param.subtype = param.enum ? 'enum' : param.type;

      // put param into form scope
      // form[operationId][param.name] = param.default || '';

      // if (param.schema) {
      // param.schema.display = 1; // display schema
      // param.schema.json = model.generateSampleJson(spec, param.schema);
      // param.schema.model = $sce.trustAsHtml(model.generateModel(spec, param.schema));
      // }

      if (param.in === 'body' || param.in === 'formData') {
        operation.consumes = operation.consumes || spec.consumes;
        // form[operationId].contentType = operation.consumes.length === 1 ? operation.consumes[0] : defaultContentType;
      }

      // paramId++;
    }
  }

  /*
   static parseResponses(swagger: Spec, operation: OperationExtended) {
   // var sampleJson;
   var sampleObj;

   operation.responses = operation.responses || {};
   operation._responses = [];

   for (const code in operation.responses) {
   let response = operation.responses[code]

   if (response.schema) {
   if (response.examples && response.examples[operation.produces[0]]) {
   // TODO: we prefer object(?)
   // sampleJson = angular.toJson(response.examples[operation.produces[0]], true);
   sampleObj = response.examples[operation.produces[0]];
   } else {
   // sampleJson = model.generateSampleJson(swagger, response.schema);
   // sampleObj = model.getSampleObj(swagger, response.schema);
   }

   // response.schema.json = sampleJson;
   (response.schema as SchemaExtended)._obj = sampleObj;

   if (response.schema.type === 'object' || response.schema.type === 'array') {
   response.display = 1; // display schema
   response.schema.model = $sce.trustAsHtml(model.generateModel(swagger, response.schema));
   } else if (response.schema.type === 'string') {
   delete response.schema;
   }

   if (code === '200' || code === '201') {
   operation.responseClass = response;
   operation.responseClass.display = 1;
   operation.responseClass.status = code;
   delete operation.responses[code];
   }
   }
   }
   }
   */

  static getMeta(spec: Spec, url: string, validatorUrl: string): IMeta[] {
    const info: Info = spec.info
    const contact: Contact = info.contact || {}
    const license: License = info.license || {} as any
    const validatorBadge = validatorUrl + '?url=' + url
    const validatorDebug = (validatorUrl && url) ? (validatorUrl + '/debug?url=' +
    url) : null

    return [
      {
        title: 'Contact',
        icon: 'person',
        value: (contact.name && !contact.email)
          ? contact.name
          : null
      },
      {
        title: 'Email',
        icon: 'email',
        value: contact.email
          ? (contact.name || contact.email)
          : null,
        link: 'mailto:' + contact.email + '?subject=' + info.title
      },
      {
        title: 'License',
        icon: 'vpn_key',
        value: license.name || license.url,
        link: license.url
      },
      {
        title: 'Terms of service',
        icon: 'assignment',
        value: info.termsOfService,
        link: info.termsOfService
      },
      {
        title: 'Client registration',
        icon: 'assignment_ind',
        value: (info as X)['x-apiClientRegistration'] && (info as X)['x-apiClientRegistration'].url,
        link: (info as X)['x-apiClientRegistration'] && (info as X)['x-apiClientRegistration'].url
      },
      {
        title: 'Documentation',
        icon: 'help_outline',
        value: spec.externalDocs &&
        (spec.externalDocs.description || spec.externalDocs.url),
        link: spec.externalDocs && spec.externalDocs.url
      },
      {
        title: 'Host',
        icon: 'home',
        value: spec.schemes[0] + '://' + spec.host,
        link: spec.schemes[0] + '://' + spec.host
      },
      {
        title: 'Base URL',
        icon: 'link',
        value: spec.basePath,
        link: (spec.schemes[0] ? (spec.schemes[0] + '://') : '') + spec.host + spec.basePath
      },
      {
        title: 'API version',
        icon: 'developer_board',
        value: info.version
      },
      {
        title: 'JSON',
        icon: 'file_download',
        link: '#',
        download: 'swagger.json'
      },
      {
        title: 'YAML',
        icon: 'file_download',
        link: '#',
        download: 'swagger.yaml'
      },
      {
        title: 'Origin',
        icon: 'cloud_download',
        value: (info as X)['x-origin'] && (info as X)['x-origin'].url,
        link: (info as X)['x-origin'] && (info as X)['x-origin'].url
      },
      {
        icon: 'code',
        link: validatorDebug,
        image: validatorBadge
      }
    ]
  }
}