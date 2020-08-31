import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.5.1
 * Query Engine version: c88925ce44a9b89b4351aec85ba6a28979d2658e
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type Action =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: Action
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Addresses
 * const addresses = await prisma.address.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Addresses
   * const addresses = await prisma.address.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$executeRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): AddressDelegate;

  /**
   * `prisma.donor`: Exposes CRUD operations for the **Donor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Donors
    * const donors = await prisma.donor.findMany()
    * ```
    */
  get donor(): DonorDelegate;

  /**
   * `prisma.education`: Exposes CRUD operations for the **Education** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Educations
    * const educations = await prisma.education.findMany()
    * ```
    */
  get education(): EducationDelegate;

  /**
   * `prisma.father`: Exposes CRUD operations for the **Father** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fathers
    * const fathers = await prisma.father.findMany()
    * ```
    */
  get father(): FatherDelegate;

  /**
   * `prisma.groupOfOrphans`: Exposes CRUD operations for the **GroupOfOrphans** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupOfOrphans
    * const groupOfOrphans = await prisma.groupOfOrphans.findMany()
    * ```
    */
  get groupOfOrphans(): GroupOfOrphansDelegate;

  /**
   * `prisma.guardian`: Exposes CRUD operations for the **Guardian** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guardians
    * const guardians = await prisma.guardian.findMany()
    * ```
    */
  get guardian(): GuardianDelegate;

  /**
   * `prisma.iga_property`: Exposes CRUD operations for the **Iga_property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Iga_properties
    * const iga_properties = await prisma.iga_property.findMany()
    * ```
    */
  get iga_property(): Iga_propertyDelegate;

  /**
   * `prisma.mother`: Exposes CRUD operations for the **Mother** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mothers
    * const mothers = await prisma.mother.findMany()
    * ```
    */
  get mother(): MotherDelegate;

  /**
   * `prisma.motherJob`: Exposes CRUD operations for the **MotherJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MotherJobs
    * const motherJobs = await prisma.motherJob.findMany()
    * ```
    */
  get motherJob(): MotherJobDelegate;

  /**
   * `prisma.orphan`: Exposes CRUD operations for the **Orphan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orphans
    * const orphans = await prisma.orphan.findMany()
    * ```
    */
  get orphan(): OrphanDelegate;

  /**
   * `prisma.sibling`: Exposes CRUD operations for the **Sibling** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Siblings
    * const siblings = await prisma.sibling.findMany()
    * ```
    */
  get sibling(): SiblingDelegate;

  /**
   * `prisma.site`: Exposes CRUD operations for the **Site** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sites
    * const sites = await prisma.site.findMany()
    * ```
    */
  get site(): SiteDelegate;

  /**
   * `prisma.socialWorker`: Exposes CRUD operations for the **SocialWorker** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SocialWorkers
    * const socialWorkers = await prisma.socialWorker.findMany()
    * ```
    */
  get socialWorker(): SocialWorkerDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const orphanGender: {
  M: 'M',
  F: 'F'
};

export declare type orphanGender = (typeof orphanGender)[keyof typeof orphanGender]


export declare const educationEnrollmentStatus: {
  enrolled: 'enrolled',
  unenrolled: 'unenrolled',
  droppedout: 'droppedout'
};

export declare type educationEnrollmentStatus = (typeof educationEnrollmentStatus)[keyof typeof educationEnrollmentStatus]


export declare const educationTypeOfSchool: {
  private: 'private',
  public: 'public'
};

export declare type educationTypeOfSchool = (typeof educationTypeOfSchool)[keyof typeof educationTypeOfSchool]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const AddressDistinctFieldEnum: {
  state: 'state',
  zone: 'zone',
  district: 'district',
  kebele: 'kebele'
};

export declare type AddressDistinctFieldEnum = (typeof AddressDistinctFieldEnum)[keyof typeof AddressDistinctFieldEnum]


export declare const GroupOfOrphansDistinctFieldEnum: {
  id: 'id',
  registrationDate: 'registrationDate',
  donorId: 'donorId',
  socialWorkerId: 'socialWorkerId',
  siteId: 'siteId'
};

export declare type GroupOfOrphansDistinctFieldEnum = (typeof GroupOfOrphansDistinctFieldEnum)[keyof typeof GroupOfOrphansDistinctFieldEnum]


export declare const OrphanDistinctFieldEnum: {
  id: 'id',
  firstName: 'firstName',
  fatherName: 'fatherName',
  grandFatherName: 'grandFatherName',
  greatGrandFatherName: 'greatGrandFatherName',
  gender: 'gender',
  placeOfBirth: 'placeOfBirth',
  dateOfBirth: 'dateOfBirth',
  numberOfSponserdSiblings: 'numberOfSponserdSiblings',
  physicalHealthStatus: 'physicalHealthStatus',
  psychologicalHealthStatus: 'psychologicalHealthStatus',
  otherHealthIssues: 'otherHealthIssues',
  photoPortraitUrl: 'photoPortraitUrl',
  photoLongUrl: 'photoLongUrl',
  fatherId: 'fatherId',
  motherId: 'motherId',
  guardianId: 'guardianId',
  groupId: 'groupId',
  siblingId: 'siblingId',
  IGA_PropertyId: 'IGA_PropertyId',
  educationId: 'educationId'
};

export declare type OrphanDistinctFieldEnum = (typeof OrphanDistinctFieldEnum)[keyof typeof OrphanDistinctFieldEnum]


export declare const SiblingDistinctFieldEnum: {
  id: 'id',
  fullName: 'fullName',
  gender: 'gender',
  age: 'age',
  schoolGrade: 'schoolGrade',
  job: 'job',
  maritalStatus: 'maritalStatus',
  orphanId: 'orphanId'
};

export declare type SiblingDistinctFieldEnum = (typeof SiblingDistinctFieldEnum)[keyof typeof SiblingDistinctFieldEnum]


export declare const SocialWorkerDistinctFieldEnum: {
  id: 'id',
  fullName: 'fullName',
  phoneNumber: 'phoneNumber',
  email: 'email',
  siteId: 'siteId'
};

export declare type SocialWorkerDistinctFieldEnum = (typeof SocialWorkerDistinctFieldEnum)[keyof typeof SocialWorkerDistinctFieldEnum]


export declare const DonorDistinctFieldEnum: {
  id: 'id',
  companyName: 'companyName',
  typeOfsupport: 'typeOfsupport',
  initialDonationAmount: 'initialDonationAmount',
  initialReportPreparationDate: 'initialReportPreparationDate',
  finalReportPreparationDate: 'finalReportPreparationDate',
  initialDataCollectionDate: 'initialDataCollectionDate',
  finalDataCollectionDate: 'finalDataCollectionDate',
  reportDueDate: 'reportDueDate'
};

export declare type DonorDistinctFieldEnum = (typeof DonorDistinctFieldEnum)[keyof typeof DonorDistinctFieldEnum]


export declare const EducationDistinctFieldEnum: {
  id: 'id',
  enrollmentStatus: 'enrollmentStatus',
  schoolName: 'schoolName',
  typeOfSchool: 'typeOfSchool',
  grade: 'grade',
  reason: 'reason',
  hobbies: 'hobbies'
};

export declare type EducationDistinctFieldEnum = (typeof EducationDistinctFieldEnum)[keyof typeof EducationDistinctFieldEnum]


export declare const FatherDistinctFieldEnum: {
  id: 'id',
  dateOfDeath: 'dateOfDeath',
  causeOfDeath: 'causeOfDeath',
  job: 'job',
  monthlyIncome: 'monthlyIncome',
  dateOfBirth: 'dateOfBirth'
};

export declare type FatherDistinctFieldEnum = (typeof FatherDistinctFieldEnum)[keyof typeof FatherDistinctFieldEnum]


export declare const GuardianDistinctFieldEnum: {
  id: 'id',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  gender: 'gender',
  nationality: 'nationality',
  state: 'state',
  zone: 'zone',
  district: 'district',
  kebele: 'kebele',
  relationToOrphan: 'relationToOrphan',
  email: 'email',
  job: 'job',
  age: 'age'
};

export declare type GuardianDistinctFieldEnum = (typeof GuardianDistinctFieldEnum)[keyof typeof GuardianDistinctFieldEnum]


export declare const Iga_propertyDistinctFieldEnum: {
  id: 'id',
  ownershipStatus: 'ownershipStatus',
  otherProperty: 'otherProperty'
};

export declare type Iga_propertyDistinctFieldEnum = (typeof Iga_propertyDistinctFieldEnum)[keyof typeof Iga_propertyDistinctFieldEnum]


export declare const MotherDistinctFieldEnum: {
  id: 'id',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  dateOfBirth: 'dateOfBirth',
  phoneNumber: 'phoneNumber',
  job: 'job',
  maritalStatus: 'maritalStatus',
  vitalStatus: 'vitalStatus',
  monthlyExpense: 'monthlyExpense'
};

export declare type MotherDistinctFieldEnum = (typeof MotherDistinctFieldEnum)[keyof typeof MotherDistinctFieldEnum]


export declare const MotherJobDistinctFieldEnum: {
  id: 'id',
  currentJobTitle: 'currentJobTitle',
  monthlyIncome: 'monthlyIncome'
};

export declare type MotherJobDistinctFieldEnum = (typeof MotherJobDistinctFieldEnum)[keyof typeof MotherJobDistinctFieldEnum]


export declare const SiteDistinctFieldEnum: {
  id: 'id',
  siteName: 'siteName',
  donationAmount: 'donationAmount',
  addressId: 'addressId'
};

export declare type SiteDistinctFieldEnum = (typeof SiteDistinctFieldEnum)[keyof typeof SiteDistinctFieldEnum]



/**
 * Model Address
 */

export type Address = {
  state: string
  zone: string
  district: string
  kebele: string
}


export type AggregateAddress = {
  count: number
}



export type AggregateAddressArgs = {
  where?: AddressWhereInput
  orderBy?: Enumerable<AddressOrderByInput>
  cursor?: AddressWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AddressDistinctFieldEnum>
  count?: true
}

export type GetAddressAggregateType<T extends AggregateAddressArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type AddressSelect = {
  state?: boolean
  zone?: boolean
  district?: boolean
  kebele?: boolean
  site?: boolean | SiteArgs
}

export type AddressInclude = {
  site?: boolean | SiteArgs
}

export type AddressGetPayload<
  S extends boolean | null | undefined | AddressArgs,
  U = keyof S
> = S extends true
  ? Address
  : S extends undefined
  ? never
  : S extends AddressArgs | FindManyAddressArgs
  ? 'include' extends U
    ? Address  & {
      [P in TrueKeys<S['include']>]:
      P extends 'site'
      ? SiteGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Address ? Address[P]
: 
      P extends 'site'
      ? SiteGetPayload<S['select'][P]> : never
    }
  : Address
: Address


export interface AddressDelegate {
  /**
   * Find zero or one Address.
   * @param {FindOneAddressArgs} args - Arguments to find a Address
   * @example
   * // Get one Address
   * const address = await prisma.address.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAddressArgs>(
    args: Subset<T, FindOneAddressArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address | null>, Prisma__AddressClient<AddressGetPayload<T> | null>>
  /**
   * Find zero or more Addresses.
   * @param {FindManyAddressArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Addresses
   * const addresses = await prisma.address.findMany()
   * 
   * // Get first 10 Addresses
   * const addresses = await prisma.address.findMany({ take: 10 })
   * 
   * // Only select the `state`
   * const addressWithStateOnly = await prisma.address.findMany({ select: { state: true } })
   * 
  **/
  findMany<T extends FindManyAddressArgs>(
    args?: Subset<T, FindManyAddressArgs>
  ): CheckSelect<T, Promise<Array<Address>>, Promise<Array<AddressGetPayload<T>>>>
  /**
   * Create a Address.
   * @param {AddressCreateArgs} args - Arguments to create a Address.
   * @example
   * // Create one Address
   * const Address = await prisma.address.create({
   *   data: {
   *     // ... data to create a Address
   *   }
   * })
   * 
  **/
  create<T extends AddressCreateArgs>(
    args: Subset<T, AddressCreateArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address>, Prisma__AddressClient<AddressGetPayload<T>>>
  /**
   * Delete a Address.
   * @param {AddressDeleteArgs} args - Arguments to delete one Address.
   * @example
   * // Delete one Address
   * const Address = await prisma.address.delete({
   *   where: {
   *     // ... filter to delete one Address
   *   }
   * })
   * 
  **/
  delete<T extends AddressDeleteArgs>(
    args: Subset<T, AddressDeleteArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address>, Prisma__AddressClient<AddressGetPayload<T>>>
  /**
   * Update one Address.
   * @param {AddressUpdateArgs} args - Arguments to update one Address.
   * @example
   * // Update one Address
   * const address = await prisma.address.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AddressUpdateArgs>(
    args: Subset<T, AddressUpdateArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address>, Prisma__AddressClient<AddressGetPayload<T>>>
  /**
   * Delete zero or more Addresses.
   * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
   * @example
   * // Delete a few Addresses
   * const { count } = await prisma.address.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AddressDeleteManyArgs>(
    args: Subset<T, AddressDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Addresses.
   * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Addresses
   * const address = await prisma.address.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AddressUpdateManyArgs>(
    args: Subset<T, AddressUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Address.
   * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
   * @example
   * // Update or create a Address
   * const address = await prisma.address.upsert({
   *   create: {
   *     // ... data to create a Address
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Address we want to update
   *   }
   * })
  **/
  upsert<T extends AddressUpsertArgs>(
    args: Subset<T, AddressUpsertArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address>, Prisma__AddressClient<AddressGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyAddressArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateAddressArgs>(args: Subset<T, AggregateAddressArgs>): Promise<GetAddressAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Address.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__AddressClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  site<T extends SiteArgs = {}>(args?: Subset<T, SiteArgs>): CheckSelect<T, Prisma__SiteClient<Site | null>, Prisma__SiteClient<SiteGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Address findOne
 */
export type FindOneAddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter, which Address to fetch.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address findMany
 */
export type FindManyAddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter, which Addresses to fetch.
  **/
  where?: AddressWhereInput
  /**
   * Determine the order of the Addresses to fetch.
  **/
  orderBy?: Enumerable<AddressOrderByInput>
  /**
   * Sets the position for listing Addresses.
  **/
  cursor?: AddressWhereUniqueInput
  /**
   * The number of Addresses to fetch. If negative number, it will take Addresses before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Addresses.
  **/
  skip?: number
  distinct?: Enumerable<AddressDistinctFieldEnum>
}


/**
 * Address create
 */
export type AddressCreateArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The data needed to create a Address.
  **/
  data: AddressCreateInput
}


/**
 * Address update
 */
export type AddressUpdateArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The data needed to update a Address.
  **/
  data: AddressUpdateInput
  /**
   * Choose, which Address to update.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address updateMany
 */
export type AddressUpdateManyArgs = {
  data: AddressUpdateManyMutationInput
  where?: AddressWhereInput
}


/**
 * Address upsert
 */
export type AddressUpsertArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The filter to search for the Address to update in case it exists.
  **/
  where: AddressWhereUniqueInput
  /**
   * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
  **/
  create: AddressCreateInput
  /**
   * In case the Address was found with the provided `where` argument, update it with this data.
  **/
  update: AddressUpdateInput
}


/**
 * Address delete
 */
export type AddressDeleteArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter which Address to delete.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address deleteMany
 */
export type AddressDeleteManyArgs = {
  where?: AddressWhereInput
}


/**
 * Address without action
 */
export type AddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
}



/**
 * Model Donor
 */

export type Donor = {
  id: number
  companyName: string
  typeOfsupport: string | null
  initialDonationAmount: number | null
  initialReportPreparationDate: Date | null
  finalReportPreparationDate: Date | null
  initialDataCollectionDate: Date | null
  finalDataCollectionDate: Date | null
  reportDueDate: Date | null
}


export type AggregateDonor = {
  count: number
  avg: DonorAvgAggregateOutputType | null
  sum: DonorSumAggregateOutputType | null
  min: DonorMinAggregateOutputType | null
  max: DonorMaxAggregateOutputType | null
}

export type DonorAvgAggregateOutputType = {
  id: number
  initialDonationAmount: number
}

export type DonorSumAggregateOutputType = {
  id: number
  initialDonationAmount: number | null
}

export type DonorMinAggregateOutputType = {
  id: number
  initialDonationAmount: number | null
}

export type DonorMaxAggregateOutputType = {
  id: number
  initialDonationAmount: number | null
}


export type DonorAvgAggregateInputType = {
  id?: true
  initialDonationAmount?: true
}

export type DonorSumAggregateInputType = {
  id?: true
  initialDonationAmount?: true
}

export type DonorMinAggregateInputType = {
  id?: true
  initialDonationAmount?: true
}

export type DonorMaxAggregateInputType = {
  id?: true
  initialDonationAmount?: true
}

export type AggregateDonorArgs = {
  where?: DonorWhereInput
  orderBy?: Enumerable<DonorOrderByInput>
  cursor?: DonorWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<DonorDistinctFieldEnum>
  count?: true
  avg?: DonorAvgAggregateInputType
  sum?: DonorSumAggregateInputType
  min?: DonorMinAggregateInputType
  max?: DonorMaxAggregateInputType
}

export type GetDonorAggregateType<T extends AggregateDonorArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetDonorAggregateScalarType<T[P]>
}

export type GetDonorAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof DonorAvgAggregateOutputType ? DonorAvgAggregateOutputType[P] : never
}
    
    

export type DonorSelect = {
  id?: boolean
  companyName?: boolean
  typeOfsupport?: boolean
  initialDonationAmount?: boolean
  initialReportPreparationDate?: boolean
  finalReportPreparationDate?: boolean
  initialDataCollectionDate?: boolean
  finalDataCollectionDate?: boolean
  reportDueDate?: boolean
  groupsOfOrphans?: boolean | FindManyGroupOfOrphansArgs
}

export type DonorInclude = {
  groupsOfOrphans?: boolean | FindManyGroupOfOrphansArgs
}

export type DonorGetPayload<
  S extends boolean | null | undefined | DonorArgs,
  U = keyof S
> = S extends true
  ? Donor
  : S extends undefined
  ? never
  : S extends DonorArgs | FindManyDonorArgs
  ? 'include' extends U
    ? Donor  & {
      [P in TrueKeys<S['include']>]:
      P extends 'groupsOfOrphans'
      ? Array<GroupOfOrphansGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Donor ? Donor[P]
: 
      P extends 'groupsOfOrphans'
      ? Array<GroupOfOrphansGetPayload<S['select'][P]>> : never
    }
  : Donor
: Donor


export interface DonorDelegate {
  /**
   * Find zero or one Donor.
   * @param {FindOneDonorArgs} args - Arguments to find a Donor
   * @example
   * // Get one Donor
   * const donor = await prisma.donor.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneDonorArgs>(
    args: Subset<T, FindOneDonorArgs>
  ): CheckSelect<T, Prisma__DonorClient<Donor | null>, Prisma__DonorClient<DonorGetPayload<T> | null>>
  /**
   * Find zero or more Donors.
   * @param {FindManyDonorArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Donors
   * const donors = await prisma.donor.findMany()
   * 
   * // Get first 10 Donors
   * const donors = await prisma.donor.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const donorWithIdOnly = await prisma.donor.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyDonorArgs>(
    args?: Subset<T, FindManyDonorArgs>
  ): CheckSelect<T, Promise<Array<Donor>>, Promise<Array<DonorGetPayload<T>>>>
  /**
   * Create a Donor.
   * @param {DonorCreateArgs} args - Arguments to create a Donor.
   * @example
   * // Create one Donor
   * const Donor = await prisma.donor.create({
   *   data: {
   *     // ... data to create a Donor
   *   }
   * })
   * 
  **/
  create<T extends DonorCreateArgs>(
    args: Subset<T, DonorCreateArgs>
  ): CheckSelect<T, Prisma__DonorClient<Donor>, Prisma__DonorClient<DonorGetPayload<T>>>
  /**
   * Delete a Donor.
   * @param {DonorDeleteArgs} args - Arguments to delete one Donor.
   * @example
   * // Delete one Donor
   * const Donor = await prisma.donor.delete({
   *   where: {
   *     // ... filter to delete one Donor
   *   }
   * })
   * 
  **/
  delete<T extends DonorDeleteArgs>(
    args: Subset<T, DonorDeleteArgs>
  ): CheckSelect<T, Prisma__DonorClient<Donor>, Prisma__DonorClient<DonorGetPayload<T>>>
  /**
   * Update one Donor.
   * @param {DonorUpdateArgs} args - Arguments to update one Donor.
   * @example
   * // Update one Donor
   * const donor = await prisma.donor.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends DonorUpdateArgs>(
    args: Subset<T, DonorUpdateArgs>
  ): CheckSelect<T, Prisma__DonorClient<Donor>, Prisma__DonorClient<DonorGetPayload<T>>>
  /**
   * Delete zero or more Donors.
   * @param {DonorDeleteManyArgs} args - Arguments to filter Donors to delete.
   * @example
   * // Delete a few Donors
   * const { count } = await prisma.donor.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends DonorDeleteManyArgs>(
    args: Subset<T, DonorDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Donors.
   * @param {DonorUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Donors
   * const donor = await prisma.donor.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends DonorUpdateManyArgs>(
    args: Subset<T, DonorUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Donor.
   * @param {DonorUpsertArgs} args - Arguments to update or create a Donor.
   * @example
   * // Update or create a Donor
   * const donor = await prisma.donor.upsert({
   *   create: {
   *     // ... data to create a Donor
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Donor we want to update
   *   }
   * })
  **/
  upsert<T extends DonorUpsertArgs>(
    args: Subset<T, DonorUpsertArgs>
  ): CheckSelect<T, Prisma__DonorClient<Donor>, Prisma__DonorClient<DonorGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyDonorArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateDonorArgs>(args: Subset<T, AggregateDonorArgs>): Promise<GetDonorAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Donor.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__DonorClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  groupsOfOrphans<T extends FindManyGroupOfOrphansArgs = {}>(args?: Subset<T, FindManyGroupOfOrphansArgs>): CheckSelect<T, Promise<Array<GroupOfOrphans>>, Promise<Array<GroupOfOrphansGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Donor findOne
 */
export type FindOneDonorArgs = {
  /**
   * Select specific fields to fetch from the Donor
  **/
  select?: DonorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: DonorInclude | null
  /**
   * Filter, which Donor to fetch.
  **/
  where: DonorWhereUniqueInput
}


/**
 * Donor findMany
 */
export type FindManyDonorArgs = {
  /**
   * Select specific fields to fetch from the Donor
  **/
  select?: DonorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: DonorInclude | null
  /**
   * Filter, which Donors to fetch.
  **/
  where?: DonorWhereInput
  /**
   * Determine the order of the Donors to fetch.
  **/
  orderBy?: Enumerable<DonorOrderByInput>
  /**
   * Sets the position for listing Donors.
  **/
  cursor?: DonorWhereUniqueInput
  /**
   * The number of Donors to fetch. If negative number, it will take Donors before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Donors.
  **/
  skip?: number
  distinct?: Enumerable<DonorDistinctFieldEnum>
}


/**
 * Donor create
 */
export type DonorCreateArgs = {
  /**
   * Select specific fields to fetch from the Donor
  **/
  select?: DonorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: DonorInclude | null
  /**
   * The data needed to create a Donor.
  **/
  data: DonorCreateInput
}


/**
 * Donor update
 */
export type DonorUpdateArgs = {
  /**
   * Select specific fields to fetch from the Donor
  **/
  select?: DonorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: DonorInclude | null
  /**
   * The data needed to update a Donor.
  **/
  data: DonorUpdateInput
  /**
   * Choose, which Donor to update.
  **/
  where: DonorWhereUniqueInput
}


/**
 * Donor updateMany
 */
export type DonorUpdateManyArgs = {
  data: DonorUpdateManyMutationInput
  where?: DonorWhereInput
}


/**
 * Donor upsert
 */
export type DonorUpsertArgs = {
  /**
   * Select specific fields to fetch from the Donor
  **/
  select?: DonorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: DonorInclude | null
  /**
   * The filter to search for the Donor to update in case it exists.
  **/
  where: DonorWhereUniqueInput
  /**
   * In case the Donor found by the `where` argument doesn't exist, create a new Donor with this data.
  **/
  create: DonorCreateInput
  /**
   * In case the Donor was found with the provided `where` argument, update it with this data.
  **/
  update: DonorUpdateInput
}


/**
 * Donor delete
 */
export type DonorDeleteArgs = {
  /**
   * Select specific fields to fetch from the Donor
  **/
  select?: DonorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: DonorInclude | null
  /**
   * Filter which Donor to delete.
  **/
  where: DonorWhereUniqueInput
}


/**
 * Donor deleteMany
 */
export type DonorDeleteManyArgs = {
  where?: DonorWhereInput
}


/**
 * Donor without action
 */
export type DonorArgs = {
  /**
   * Select specific fields to fetch from the Donor
  **/
  select?: DonorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: DonorInclude | null
}



/**
 * Model Education
 */

export type Education = {
  id: number
  enrollmentStatus: educationEnrollmentStatus
  schoolName: string | null
  typeOfSchool: educationTypeOfSchool | null
  grade: string | null
  reason: string | null
  hobbies: string | null
}


export type AggregateEducation = {
  count: number
  avg: EducationAvgAggregateOutputType | null
  sum: EducationSumAggregateOutputType | null
  min: EducationMinAggregateOutputType | null
  max: EducationMaxAggregateOutputType | null
}

export type EducationAvgAggregateOutputType = {
  id: number
}

export type EducationSumAggregateOutputType = {
  id: number
}

export type EducationMinAggregateOutputType = {
  id: number
}

export type EducationMaxAggregateOutputType = {
  id: number
}


export type EducationAvgAggregateInputType = {
  id?: true
}

export type EducationSumAggregateInputType = {
  id?: true
}

export type EducationMinAggregateInputType = {
  id?: true
}

export type EducationMaxAggregateInputType = {
  id?: true
}

export type AggregateEducationArgs = {
  where?: EducationWhereInput
  orderBy?: Enumerable<EducationOrderByInput>
  cursor?: EducationWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<EducationDistinctFieldEnum>
  count?: true
  avg?: EducationAvgAggregateInputType
  sum?: EducationSumAggregateInputType
  min?: EducationMinAggregateInputType
  max?: EducationMaxAggregateInputType
}

export type GetEducationAggregateType<T extends AggregateEducationArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetEducationAggregateScalarType<T[P]>
}

export type GetEducationAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof EducationAvgAggregateOutputType ? EducationAvgAggregateOutputType[P] : never
}
    
    

export type EducationSelect = {
  id?: boolean
  enrollmentStatus?: boolean
  schoolName?: boolean
  typeOfSchool?: boolean
  grade?: boolean
  reason?: boolean
  hobbies?: boolean
  orphans?: boolean | FindManyOrphanArgs
}

export type EducationInclude = {
  orphans?: boolean | FindManyOrphanArgs
}

export type EducationGetPayload<
  S extends boolean | null | undefined | EducationArgs,
  U = keyof S
> = S extends true
  ? Education
  : S extends undefined
  ? never
  : S extends EducationArgs | FindManyEducationArgs
  ? 'include' extends U
    ? Education  & {
      [P in TrueKeys<S['include']>]:
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Education ? Education[P]
: 
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['select'][P]>> : never
    }
  : Education
: Education


export interface EducationDelegate {
  /**
   * Find zero or one Education.
   * @param {FindOneEducationArgs} args - Arguments to find a Education
   * @example
   * // Get one Education
   * const education = await prisma.education.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneEducationArgs>(
    args: Subset<T, FindOneEducationArgs>
  ): CheckSelect<T, Prisma__EducationClient<Education | null>, Prisma__EducationClient<EducationGetPayload<T> | null>>
  /**
   * Find zero or more Educations.
   * @param {FindManyEducationArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Educations
   * const educations = await prisma.education.findMany()
   * 
   * // Get first 10 Educations
   * const educations = await prisma.education.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const educationWithIdOnly = await prisma.education.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyEducationArgs>(
    args?: Subset<T, FindManyEducationArgs>
  ): CheckSelect<T, Promise<Array<Education>>, Promise<Array<EducationGetPayload<T>>>>
  /**
   * Create a Education.
   * @param {EducationCreateArgs} args - Arguments to create a Education.
   * @example
   * // Create one Education
   * const Education = await prisma.education.create({
   *   data: {
   *     // ... data to create a Education
   *   }
   * })
   * 
  **/
  create<T extends EducationCreateArgs>(
    args: Subset<T, EducationCreateArgs>
  ): CheckSelect<T, Prisma__EducationClient<Education>, Prisma__EducationClient<EducationGetPayload<T>>>
  /**
   * Delete a Education.
   * @param {EducationDeleteArgs} args - Arguments to delete one Education.
   * @example
   * // Delete one Education
   * const Education = await prisma.education.delete({
   *   where: {
   *     // ... filter to delete one Education
   *   }
   * })
   * 
  **/
  delete<T extends EducationDeleteArgs>(
    args: Subset<T, EducationDeleteArgs>
  ): CheckSelect<T, Prisma__EducationClient<Education>, Prisma__EducationClient<EducationGetPayload<T>>>
  /**
   * Update one Education.
   * @param {EducationUpdateArgs} args - Arguments to update one Education.
   * @example
   * // Update one Education
   * const education = await prisma.education.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends EducationUpdateArgs>(
    args: Subset<T, EducationUpdateArgs>
  ): CheckSelect<T, Prisma__EducationClient<Education>, Prisma__EducationClient<EducationGetPayload<T>>>
  /**
   * Delete zero or more Educations.
   * @param {EducationDeleteManyArgs} args - Arguments to filter Educations to delete.
   * @example
   * // Delete a few Educations
   * const { count } = await prisma.education.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends EducationDeleteManyArgs>(
    args: Subset<T, EducationDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Educations.
   * @param {EducationUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Educations
   * const education = await prisma.education.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends EducationUpdateManyArgs>(
    args: Subset<T, EducationUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Education.
   * @param {EducationUpsertArgs} args - Arguments to update or create a Education.
   * @example
   * // Update or create a Education
   * const education = await prisma.education.upsert({
   *   create: {
   *     // ... data to create a Education
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Education we want to update
   *   }
   * })
  **/
  upsert<T extends EducationUpsertArgs>(
    args: Subset<T, EducationUpsertArgs>
  ): CheckSelect<T, Prisma__EducationClient<Education>, Prisma__EducationClient<EducationGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyEducationArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateEducationArgs>(args: Subset<T, AggregateEducationArgs>): Promise<GetEducationAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Education.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__EducationClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  orphans<T extends FindManyOrphanArgs = {}>(args?: Subset<T, FindManyOrphanArgs>): CheckSelect<T, Promise<Array<Orphan>>, Promise<Array<OrphanGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Education findOne
 */
export type FindOneEducationArgs = {
  /**
   * Select specific fields to fetch from the Education
  **/
  select?: EducationSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationInclude | null
  /**
   * Filter, which Education to fetch.
  **/
  where: EducationWhereUniqueInput
}


/**
 * Education findMany
 */
export type FindManyEducationArgs = {
  /**
   * Select specific fields to fetch from the Education
  **/
  select?: EducationSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationInclude | null
  /**
   * Filter, which Educations to fetch.
  **/
  where?: EducationWhereInput
  /**
   * Determine the order of the Educations to fetch.
  **/
  orderBy?: Enumerable<EducationOrderByInput>
  /**
   * Sets the position for listing Educations.
  **/
  cursor?: EducationWhereUniqueInput
  /**
   * The number of Educations to fetch. If negative number, it will take Educations before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Educations.
  **/
  skip?: number
  distinct?: Enumerable<EducationDistinctFieldEnum>
}


/**
 * Education create
 */
export type EducationCreateArgs = {
  /**
   * Select specific fields to fetch from the Education
  **/
  select?: EducationSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationInclude | null
  /**
   * The data needed to create a Education.
  **/
  data: EducationCreateInput
}


/**
 * Education update
 */
export type EducationUpdateArgs = {
  /**
   * Select specific fields to fetch from the Education
  **/
  select?: EducationSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationInclude | null
  /**
   * The data needed to update a Education.
  **/
  data: EducationUpdateInput
  /**
   * Choose, which Education to update.
  **/
  where: EducationWhereUniqueInput
}


/**
 * Education updateMany
 */
export type EducationUpdateManyArgs = {
  data: EducationUpdateManyMutationInput
  where?: EducationWhereInput
}


/**
 * Education upsert
 */
export type EducationUpsertArgs = {
  /**
   * Select specific fields to fetch from the Education
  **/
  select?: EducationSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationInclude | null
  /**
   * The filter to search for the Education to update in case it exists.
  **/
  where: EducationWhereUniqueInput
  /**
   * In case the Education found by the `where` argument doesn't exist, create a new Education with this data.
  **/
  create: EducationCreateInput
  /**
   * In case the Education was found with the provided `where` argument, update it with this data.
  **/
  update: EducationUpdateInput
}


/**
 * Education delete
 */
export type EducationDeleteArgs = {
  /**
   * Select specific fields to fetch from the Education
  **/
  select?: EducationSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationInclude | null
  /**
   * Filter which Education to delete.
  **/
  where: EducationWhereUniqueInput
}


/**
 * Education deleteMany
 */
export type EducationDeleteManyArgs = {
  where?: EducationWhereInput
}


/**
 * Education without action
 */
export type EducationArgs = {
  /**
   * Select specific fields to fetch from the Education
  **/
  select?: EducationSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationInclude | null
}



/**
 * Model Father
 */

export type Father = {
  id: number
  dateOfDeath: Date
  causeOfDeath: string
  job: string | null
  monthlyIncome: number
  dateOfBirth: Date
}


export type AggregateFather = {
  count: number
  avg: FatherAvgAggregateOutputType | null
  sum: FatherSumAggregateOutputType | null
  min: FatherMinAggregateOutputType | null
  max: FatherMaxAggregateOutputType | null
}

export type FatherAvgAggregateOutputType = {
  id: number
  monthlyIncome: number
}

export type FatherSumAggregateOutputType = {
  id: number
  monthlyIncome: number
}

export type FatherMinAggregateOutputType = {
  id: number
  monthlyIncome: number
}

export type FatherMaxAggregateOutputType = {
  id: number
  monthlyIncome: number
}


export type FatherAvgAggregateInputType = {
  id?: true
  monthlyIncome?: true
}

export type FatherSumAggregateInputType = {
  id?: true
  monthlyIncome?: true
}

export type FatherMinAggregateInputType = {
  id?: true
  monthlyIncome?: true
}

export type FatherMaxAggregateInputType = {
  id?: true
  monthlyIncome?: true
}

export type AggregateFatherArgs = {
  where?: FatherWhereInput
  orderBy?: Enumerable<FatherOrderByInput>
  cursor?: FatherWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<FatherDistinctFieldEnum>
  count?: true
  avg?: FatherAvgAggregateInputType
  sum?: FatherSumAggregateInputType
  min?: FatherMinAggregateInputType
  max?: FatherMaxAggregateInputType
}

export type GetFatherAggregateType<T extends AggregateFatherArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetFatherAggregateScalarType<T[P]>
}

export type GetFatherAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof FatherAvgAggregateOutputType ? FatherAvgAggregateOutputType[P] : never
}
    
    

export type FatherSelect = {
  id?: boolean
  dateOfDeath?: boolean
  causeOfDeath?: boolean
  job?: boolean
  monthlyIncome?: boolean
  dateOfBirth?: boolean
  orphans?: boolean | FindManyOrphanArgs
}

export type FatherInclude = {
  orphans?: boolean | FindManyOrphanArgs
}

export type FatherGetPayload<
  S extends boolean | null | undefined | FatherArgs,
  U = keyof S
> = S extends true
  ? Father
  : S extends undefined
  ? never
  : S extends FatherArgs | FindManyFatherArgs
  ? 'include' extends U
    ? Father  & {
      [P in TrueKeys<S['include']>]:
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Father ? Father[P]
: 
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['select'][P]>> : never
    }
  : Father
: Father


export interface FatherDelegate {
  /**
   * Find zero or one Father.
   * @param {FindOneFatherArgs} args - Arguments to find a Father
   * @example
   * // Get one Father
   * const father = await prisma.father.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneFatherArgs>(
    args: Subset<T, FindOneFatherArgs>
  ): CheckSelect<T, Prisma__FatherClient<Father | null>, Prisma__FatherClient<FatherGetPayload<T> | null>>
  /**
   * Find zero or more Fathers.
   * @param {FindManyFatherArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Fathers
   * const fathers = await prisma.father.findMany()
   * 
   * // Get first 10 Fathers
   * const fathers = await prisma.father.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const fatherWithIdOnly = await prisma.father.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyFatherArgs>(
    args?: Subset<T, FindManyFatherArgs>
  ): CheckSelect<T, Promise<Array<Father>>, Promise<Array<FatherGetPayload<T>>>>
  /**
   * Create a Father.
   * @param {FatherCreateArgs} args - Arguments to create a Father.
   * @example
   * // Create one Father
   * const Father = await prisma.father.create({
   *   data: {
   *     // ... data to create a Father
   *   }
   * })
   * 
  **/
  create<T extends FatherCreateArgs>(
    args: Subset<T, FatherCreateArgs>
  ): CheckSelect<T, Prisma__FatherClient<Father>, Prisma__FatherClient<FatherGetPayload<T>>>
  /**
   * Delete a Father.
   * @param {FatherDeleteArgs} args - Arguments to delete one Father.
   * @example
   * // Delete one Father
   * const Father = await prisma.father.delete({
   *   where: {
   *     // ... filter to delete one Father
   *   }
   * })
   * 
  **/
  delete<T extends FatherDeleteArgs>(
    args: Subset<T, FatherDeleteArgs>
  ): CheckSelect<T, Prisma__FatherClient<Father>, Prisma__FatherClient<FatherGetPayload<T>>>
  /**
   * Update one Father.
   * @param {FatherUpdateArgs} args - Arguments to update one Father.
   * @example
   * // Update one Father
   * const father = await prisma.father.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends FatherUpdateArgs>(
    args: Subset<T, FatherUpdateArgs>
  ): CheckSelect<T, Prisma__FatherClient<Father>, Prisma__FatherClient<FatherGetPayload<T>>>
  /**
   * Delete zero or more Fathers.
   * @param {FatherDeleteManyArgs} args - Arguments to filter Fathers to delete.
   * @example
   * // Delete a few Fathers
   * const { count } = await prisma.father.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends FatherDeleteManyArgs>(
    args: Subset<T, FatherDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Fathers.
   * @param {FatherUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Fathers
   * const father = await prisma.father.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends FatherUpdateManyArgs>(
    args: Subset<T, FatherUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Father.
   * @param {FatherUpsertArgs} args - Arguments to update or create a Father.
   * @example
   * // Update or create a Father
   * const father = await prisma.father.upsert({
   *   create: {
   *     // ... data to create a Father
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Father we want to update
   *   }
   * })
  **/
  upsert<T extends FatherUpsertArgs>(
    args: Subset<T, FatherUpsertArgs>
  ): CheckSelect<T, Prisma__FatherClient<Father>, Prisma__FatherClient<FatherGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyFatherArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateFatherArgs>(args: Subset<T, AggregateFatherArgs>): Promise<GetFatherAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Father.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__FatherClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  orphans<T extends FindManyOrphanArgs = {}>(args?: Subset<T, FindManyOrphanArgs>): CheckSelect<T, Promise<Array<Orphan>>, Promise<Array<OrphanGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Father findOne
 */
export type FindOneFatherArgs = {
  /**
   * Select specific fields to fetch from the Father
  **/
  select?: FatherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FatherInclude | null
  /**
   * Filter, which Father to fetch.
  **/
  where: FatherWhereUniqueInput
}


/**
 * Father findMany
 */
export type FindManyFatherArgs = {
  /**
   * Select specific fields to fetch from the Father
  **/
  select?: FatherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FatherInclude | null
  /**
   * Filter, which Fathers to fetch.
  **/
  where?: FatherWhereInput
  /**
   * Determine the order of the Fathers to fetch.
  **/
  orderBy?: Enumerable<FatherOrderByInput>
  /**
   * Sets the position for listing Fathers.
  **/
  cursor?: FatherWhereUniqueInput
  /**
   * The number of Fathers to fetch. If negative number, it will take Fathers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Fathers.
  **/
  skip?: number
  distinct?: Enumerable<FatherDistinctFieldEnum>
}


/**
 * Father create
 */
export type FatherCreateArgs = {
  /**
   * Select specific fields to fetch from the Father
  **/
  select?: FatherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FatherInclude | null
  /**
   * The data needed to create a Father.
  **/
  data: FatherCreateInput
}


/**
 * Father update
 */
export type FatherUpdateArgs = {
  /**
   * Select specific fields to fetch from the Father
  **/
  select?: FatherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FatherInclude | null
  /**
   * The data needed to update a Father.
  **/
  data: FatherUpdateInput
  /**
   * Choose, which Father to update.
  **/
  where: FatherWhereUniqueInput
}


/**
 * Father updateMany
 */
export type FatherUpdateManyArgs = {
  data: FatherUpdateManyMutationInput
  where?: FatherWhereInput
}


/**
 * Father upsert
 */
export type FatherUpsertArgs = {
  /**
   * Select specific fields to fetch from the Father
  **/
  select?: FatherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FatherInclude | null
  /**
   * The filter to search for the Father to update in case it exists.
  **/
  where: FatherWhereUniqueInput
  /**
   * In case the Father found by the `where` argument doesn't exist, create a new Father with this data.
  **/
  create: FatherCreateInput
  /**
   * In case the Father was found with the provided `where` argument, update it with this data.
  **/
  update: FatherUpdateInput
}


/**
 * Father delete
 */
export type FatherDeleteArgs = {
  /**
   * Select specific fields to fetch from the Father
  **/
  select?: FatherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FatherInclude | null
  /**
   * Filter which Father to delete.
  **/
  where: FatherWhereUniqueInput
}


/**
 * Father deleteMany
 */
export type FatherDeleteManyArgs = {
  where?: FatherWhereInput
}


/**
 * Father without action
 */
export type FatherArgs = {
  /**
   * Select specific fields to fetch from the Father
  **/
  select?: FatherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FatherInclude | null
}



/**
 * Model GroupOfOrphans
 */

export type GroupOfOrphans = {
  id: number
  registrationDate: Date
  donorId: number
  socialWorkerId: number
  siteId: number
}


export type AggregateGroupOfOrphans = {
  count: number
  avg: GroupOfOrphansAvgAggregateOutputType | null
  sum: GroupOfOrphansSumAggregateOutputType | null
  min: GroupOfOrphansMinAggregateOutputType | null
  max: GroupOfOrphansMaxAggregateOutputType | null
}

export type GroupOfOrphansAvgAggregateOutputType = {
  id: number
  donorId: number
  socialWorkerId: number
  siteId: number
}

export type GroupOfOrphansSumAggregateOutputType = {
  id: number
  donorId: number
  socialWorkerId: number
  siteId: number
}

export type GroupOfOrphansMinAggregateOutputType = {
  id: number
  donorId: number
  socialWorkerId: number
  siteId: number
}

export type GroupOfOrphansMaxAggregateOutputType = {
  id: number
  donorId: number
  socialWorkerId: number
  siteId: number
}


export type GroupOfOrphansAvgAggregateInputType = {
  id?: true
  donorId?: true
  socialWorkerId?: true
  siteId?: true
}

export type GroupOfOrphansSumAggregateInputType = {
  id?: true
  donorId?: true
  socialWorkerId?: true
  siteId?: true
}

export type GroupOfOrphansMinAggregateInputType = {
  id?: true
  donorId?: true
  socialWorkerId?: true
  siteId?: true
}

export type GroupOfOrphansMaxAggregateInputType = {
  id?: true
  donorId?: true
  socialWorkerId?: true
  siteId?: true
}

export type AggregateGroupOfOrphansArgs = {
  where?: GroupOfOrphansWhereInput
  orderBy?: Enumerable<GroupOfOrphansOrderByInput>
  cursor?: GroupOfOrphansWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<GroupOfOrphansDistinctFieldEnum>
  count?: true
  avg?: GroupOfOrphansAvgAggregateInputType
  sum?: GroupOfOrphansSumAggregateInputType
  min?: GroupOfOrphansMinAggregateInputType
  max?: GroupOfOrphansMaxAggregateInputType
}

export type GetGroupOfOrphansAggregateType<T extends AggregateGroupOfOrphansArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetGroupOfOrphansAggregateScalarType<T[P]>
}

export type GetGroupOfOrphansAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof GroupOfOrphansAvgAggregateOutputType ? GroupOfOrphansAvgAggregateOutputType[P] : never
}
    
    

export type GroupOfOrphansSelect = {
  id?: boolean
  registrationDate?: boolean
  donorId?: boolean
  socialWorkerId?: boolean
  siteId?: boolean
  donor?: boolean | DonorArgs
  site?: boolean | SiteArgs
  socialworker?: boolean | SocialWorkerArgs
  orphans?: boolean | FindManyOrphanArgs
}

export type GroupOfOrphansInclude = {
  donor?: boolean | DonorArgs
  site?: boolean | SiteArgs
  socialworker?: boolean | SocialWorkerArgs
  orphans?: boolean | FindManyOrphanArgs
}

export type GroupOfOrphansGetPayload<
  S extends boolean | null | undefined | GroupOfOrphansArgs,
  U = keyof S
> = S extends true
  ? GroupOfOrphans
  : S extends undefined
  ? never
  : S extends GroupOfOrphansArgs | FindManyGroupOfOrphansArgs
  ? 'include' extends U
    ? GroupOfOrphans  & {
      [P in TrueKeys<S['include']>]:
      P extends 'donor'
      ? DonorGetPayload<S['include'][P]> :
      P extends 'site'
      ? SiteGetPayload<S['include'][P]> :
      P extends 'socialworker'
      ? SocialWorkerGetPayload<S['include'][P]> :
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof GroupOfOrphans ? GroupOfOrphans[P]
: 
      P extends 'donor'
      ? DonorGetPayload<S['select'][P]> :
      P extends 'site'
      ? SiteGetPayload<S['select'][P]> :
      P extends 'socialworker'
      ? SocialWorkerGetPayload<S['select'][P]> :
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['select'][P]>> : never
    }
  : GroupOfOrphans
: GroupOfOrphans


export interface GroupOfOrphansDelegate {
  /**
   * Find zero or one GroupOfOrphans.
   * @param {FindOneGroupOfOrphansArgs} args - Arguments to find a GroupOfOrphans
   * @example
   * // Get one GroupOfOrphans
   * const groupOfOrphans = await prisma.groupOfOrphans.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneGroupOfOrphansArgs>(
    args: Subset<T, FindOneGroupOfOrphansArgs>
  ): CheckSelect<T, Prisma__GroupOfOrphansClient<GroupOfOrphans | null>, Prisma__GroupOfOrphansClient<GroupOfOrphansGetPayload<T> | null>>
  /**
   * Find zero or more GroupOfOrphans.
   * @param {FindManyGroupOfOrphansArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all GroupOfOrphans
   * const groupOfOrphans = await prisma.groupOfOrphans.findMany()
   * 
   * // Get first 10 GroupOfOrphans
   * const groupOfOrphans = await prisma.groupOfOrphans.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const groupOfOrphansWithIdOnly = await prisma.groupOfOrphans.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyGroupOfOrphansArgs>(
    args?: Subset<T, FindManyGroupOfOrphansArgs>
  ): CheckSelect<T, Promise<Array<GroupOfOrphans>>, Promise<Array<GroupOfOrphansGetPayload<T>>>>
  /**
   * Create a GroupOfOrphans.
   * @param {GroupOfOrphansCreateArgs} args - Arguments to create a GroupOfOrphans.
   * @example
   * // Create one GroupOfOrphans
   * const GroupOfOrphans = await prisma.groupOfOrphans.create({
   *   data: {
   *     // ... data to create a GroupOfOrphans
   *   }
   * })
   * 
  **/
  create<T extends GroupOfOrphansCreateArgs>(
    args: Subset<T, GroupOfOrphansCreateArgs>
  ): CheckSelect<T, Prisma__GroupOfOrphansClient<GroupOfOrphans>, Prisma__GroupOfOrphansClient<GroupOfOrphansGetPayload<T>>>
  /**
   * Delete a GroupOfOrphans.
   * @param {GroupOfOrphansDeleteArgs} args - Arguments to delete one GroupOfOrphans.
   * @example
   * // Delete one GroupOfOrphans
   * const GroupOfOrphans = await prisma.groupOfOrphans.delete({
   *   where: {
   *     // ... filter to delete one GroupOfOrphans
   *   }
   * })
   * 
  **/
  delete<T extends GroupOfOrphansDeleteArgs>(
    args: Subset<T, GroupOfOrphansDeleteArgs>
  ): CheckSelect<T, Prisma__GroupOfOrphansClient<GroupOfOrphans>, Prisma__GroupOfOrphansClient<GroupOfOrphansGetPayload<T>>>
  /**
   * Update one GroupOfOrphans.
   * @param {GroupOfOrphansUpdateArgs} args - Arguments to update one GroupOfOrphans.
   * @example
   * // Update one GroupOfOrphans
   * const groupOfOrphans = await prisma.groupOfOrphans.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends GroupOfOrphansUpdateArgs>(
    args: Subset<T, GroupOfOrphansUpdateArgs>
  ): CheckSelect<T, Prisma__GroupOfOrphansClient<GroupOfOrphans>, Prisma__GroupOfOrphansClient<GroupOfOrphansGetPayload<T>>>
  /**
   * Delete zero or more GroupOfOrphans.
   * @param {GroupOfOrphansDeleteManyArgs} args - Arguments to filter GroupOfOrphans to delete.
   * @example
   * // Delete a few GroupOfOrphans
   * const { count } = await prisma.groupOfOrphans.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends GroupOfOrphansDeleteManyArgs>(
    args: Subset<T, GroupOfOrphansDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more GroupOfOrphans.
   * @param {GroupOfOrphansUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many GroupOfOrphans
   * const groupOfOrphans = await prisma.groupOfOrphans.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends GroupOfOrphansUpdateManyArgs>(
    args: Subset<T, GroupOfOrphansUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one GroupOfOrphans.
   * @param {GroupOfOrphansUpsertArgs} args - Arguments to update or create a GroupOfOrphans.
   * @example
   * // Update or create a GroupOfOrphans
   * const groupOfOrphans = await prisma.groupOfOrphans.upsert({
   *   create: {
   *     // ... data to create a GroupOfOrphans
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the GroupOfOrphans we want to update
   *   }
   * })
  **/
  upsert<T extends GroupOfOrphansUpsertArgs>(
    args: Subset<T, GroupOfOrphansUpsertArgs>
  ): CheckSelect<T, Prisma__GroupOfOrphansClient<GroupOfOrphans>, Prisma__GroupOfOrphansClient<GroupOfOrphansGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyGroupOfOrphansArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateGroupOfOrphansArgs>(args: Subset<T, AggregateGroupOfOrphansArgs>): Promise<GetGroupOfOrphansAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for GroupOfOrphans.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__GroupOfOrphansClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  donor<T extends DonorArgs = {}>(args?: Subset<T, DonorArgs>): CheckSelect<T, Prisma__DonorClient<Donor | null>, Prisma__DonorClient<DonorGetPayload<T> | null>>;

  site<T extends SiteArgs = {}>(args?: Subset<T, SiteArgs>): CheckSelect<T, Prisma__SiteClient<Site | null>, Prisma__SiteClient<SiteGetPayload<T> | null>>;

  socialworker<T extends SocialWorkerArgs = {}>(args?: Subset<T, SocialWorkerArgs>): CheckSelect<T, Prisma__SocialWorkerClient<SocialWorker | null>, Prisma__SocialWorkerClient<SocialWorkerGetPayload<T> | null>>;

  orphans<T extends FindManyOrphanArgs = {}>(args?: Subset<T, FindManyOrphanArgs>): CheckSelect<T, Promise<Array<Orphan>>, Promise<Array<OrphanGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * GroupOfOrphans findOne
 */
export type FindOneGroupOfOrphansArgs = {
  /**
   * Select specific fields to fetch from the GroupOfOrphans
  **/
  select?: GroupOfOrphansSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GroupOfOrphansInclude | null
  /**
   * Filter, which GroupOfOrphans to fetch.
  **/
  where: GroupOfOrphansWhereUniqueInput
}


/**
 * GroupOfOrphans findMany
 */
export type FindManyGroupOfOrphansArgs = {
  /**
   * Select specific fields to fetch from the GroupOfOrphans
  **/
  select?: GroupOfOrphansSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GroupOfOrphansInclude | null
  /**
   * Filter, which GroupOfOrphans to fetch.
  **/
  where?: GroupOfOrphansWhereInput
  /**
   * Determine the order of the GroupOfOrphans to fetch.
  **/
  orderBy?: Enumerable<GroupOfOrphansOrderByInput>
  /**
   * Sets the position for listing GroupOfOrphans.
  **/
  cursor?: GroupOfOrphansWhereUniqueInput
  /**
   * The number of GroupOfOrphans to fetch. If negative number, it will take GroupOfOrphans before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` GroupOfOrphans.
  **/
  skip?: number
  distinct?: Enumerable<GroupOfOrphansDistinctFieldEnum>
}


/**
 * GroupOfOrphans create
 */
export type GroupOfOrphansCreateArgs = {
  /**
   * Select specific fields to fetch from the GroupOfOrphans
  **/
  select?: GroupOfOrphansSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GroupOfOrphansInclude | null
  /**
   * The data needed to create a GroupOfOrphans.
  **/
  data: GroupOfOrphansCreateInput
}


/**
 * GroupOfOrphans update
 */
export type GroupOfOrphansUpdateArgs = {
  /**
   * Select specific fields to fetch from the GroupOfOrphans
  **/
  select?: GroupOfOrphansSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GroupOfOrphansInclude | null
  /**
   * The data needed to update a GroupOfOrphans.
  **/
  data: GroupOfOrphansUpdateInput
  /**
   * Choose, which GroupOfOrphans to update.
  **/
  where: GroupOfOrphansWhereUniqueInput
}


/**
 * GroupOfOrphans updateMany
 */
export type GroupOfOrphansUpdateManyArgs = {
  data: GroupOfOrphansUpdateManyMutationInput
  where?: GroupOfOrphansWhereInput
}


/**
 * GroupOfOrphans upsert
 */
export type GroupOfOrphansUpsertArgs = {
  /**
   * Select specific fields to fetch from the GroupOfOrphans
  **/
  select?: GroupOfOrphansSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GroupOfOrphansInclude | null
  /**
   * The filter to search for the GroupOfOrphans to update in case it exists.
  **/
  where: GroupOfOrphansWhereUniqueInput
  /**
   * In case the GroupOfOrphans found by the `where` argument doesn't exist, create a new GroupOfOrphans with this data.
  **/
  create: GroupOfOrphansCreateInput
  /**
   * In case the GroupOfOrphans was found with the provided `where` argument, update it with this data.
  **/
  update: GroupOfOrphansUpdateInput
}


/**
 * GroupOfOrphans delete
 */
export type GroupOfOrphansDeleteArgs = {
  /**
   * Select specific fields to fetch from the GroupOfOrphans
  **/
  select?: GroupOfOrphansSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GroupOfOrphansInclude | null
  /**
   * Filter which GroupOfOrphans to delete.
  **/
  where: GroupOfOrphansWhereUniqueInput
}


/**
 * GroupOfOrphans deleteMany
 */
export type GroupOfOrphansDeleteManyArgs = {
  where?: GroupOfOrphansWhereInput
}


/**
 * GroupOfOrphans without action
 */
export type GroupOfOrphansArgs = {
  /**
   * Select specific fields to fetch from the GroupOfOrphans
  **/
  select?: GroupOfOrphansSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GroupOfOrphansInclude | null
}



/**
 * Model Guardian
 */

export type Guardian = {
  id: number
  firstName: string
  middleName: string
  lastName: string
  gender: string
  nationality: string
  state: string
  zone: string
  district: string
  kebele: string
  relationToOrphan: string
  email: string
  job: string | null
  age: number
}


export type AggregateGuardian = {
  count: number
  avg: GuardianAvgAggregateOutputType | null
  sum: GuardianSumAggregateOutputType | null
  min: GuardianMinAggregateOutputType | null
  max: GuardianMaxAggregateOutputType | null
}

export type GuardianAvgAggregateOutputType = {
  id: number
  age: number
}

export type GuardianSumAggregateOutputType = {
  id: number
  age: number
}

export type GuardianMinAggregateOutputType = {
  id: number
  age: number
}

export type GuardianMaxAggregateOutputType = {
  id: number
  age: number
}


export type GuardianAvgAggregateInputType = {
  id?: true
  age?: true
}

export type GuardianSumAggregateInputType = {
  id?: true
  age?: true
}

export type GuardianMinAggregateInputType = {
  id?: true
  age?: true
}

export type GuardianMaxAggregateInputType = {
  id?: true
  age?: true
}

export type AggregateGuardianArgs = {
  where?: GuardianWhereInput
  orderBy?: Enumerable<GuardianOrderByInput>
  cursor?: GuardianWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<GuardianDistinctFieldEnum>
  count?: true
  avg?: GuardianAvgAggregateInputType
  sum?: GuardianSumAggregateInputType
  min?: GuardianMinAggregateInputType
  max?: GuardianMaxAggregateInputType
}

export type GetGuardianAggregateType<T extends AggregateGuardianArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetGuardianAggregateScalarType<T[P]>
}

export type GetGuardianAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof GuardianAvgAggregateOutputType ? GuardianAvgAggregateOutputType[P] : never
}
    
    

export type GuardianSelect = {
  id?: boolean
  firstName?: boolean
  middleName?: boolean
  lastName?: boolean
  gender?: boolean
  nationality?: boolean
  state?: boolean
  zone?: boolean
  district?: boolean
  kebele?: boolean
  relationToOrphan?: boolean
  email?: boolean
  job?: boolean
  age?: boolean
  orphans?: boolean | FindManyOrphanArgs
}

export type GuardianInclude = {
  orphans?: boolean | FindManyOrphanArgs
}

export type GuardianGetPayload<
  S extends boolean | null | undefined | GuardianArgs,
  U = keyof S
> = S extends true
  ? Guardian
  : S extends undefined
  ? never
  : S extends GuardianArgs | FindManyGuardianArgs
  ? 'include' extends U
    ? Guardian  & {
      [P in TrueKeys<S['include']>]:
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Guardian ? Guardian[P]
: 
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['select'][P]>> : never
    }
  : Guardian
: Guardian


export interface GuardianDelegate {
  /**
   * Find zero or one Guardian.
   * @param {FindOneGuardianArgs} args - Arguments to find a Guardian
   * @example
   * // Get one Guardian
   * const guardian = await prisma.guardian.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneGuardianArgs>(
    args: Subset<T, FindOneGuardianArgs>
  ): CheckSelect<T, Prisma__GuardianClient<Guardian | null>, Prisma__GuardianClient<GuardianGetPayload<T> | null>>
  /**
   * Find zero or more Guardians.
   * @param {FindManyGuardianArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Guardians
   * const guardians = await prisma.guardian.findMany()
   * 
   * // Get first 10 Guardians
   * const guardians = await prisma.guardian.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const guardianWithIdOnly = await prisma.guardian.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyGuardianArgs>(
    args?: Subset<T, FindManyGuardianArgs>
  ): CheckSelect<T, Promise<Array<Guardian>>, Promise<Array<GuardianGetPayload<T>>>>
  /**
   * Create a Guardian.
   * @param {GuardianCreateArgs} args - Arguments to create a Guardian.
   * @example
   * // Create one Guardian
   * const Guardian = await prisma.guardian.create({
   *   data: {
   *     // ... data to create a Guardian
   *   }
   * })
   * 
  **/
  create<T extends GuardianCreateArgs>(
    args: Subset<T, GuardianCreateArgs>
  ): CheckSelect<T, Prisma__GuardianClient<Guardian>, Prisma__GuardianClient<GuardianGetPayload<T>>>
  /**
   * Delete a Guardian.
   * @param {GuardianDeleteArgs} args - Arguments to delete one Guardian.
   * @example
   * // Delete one Guardian
   * const Guardian = await prisma.guardian.delete({
   *   where: {
   *     // ... filter to delete one Guardian
   *   }
   * })
   * 
  **/
  delete<T extends GuardianDeleteArgs>(
    args: Subset<T, GuardianDeleteArgs>
  ): CheckSelect<T, Prisma__GuardianClient<Guardian>, Prisma__GuardianClient<GuardianGetPayload<T>>>
  /**
   * Update one Guardian.
   * @param {GuardianUpdateArgs} args - Arguments to update one Guardian.
   * @example
   * // Update one Guardian
   * const guardian = await prisma.guardian.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends GuardianUpdateArgs>(
    args: Subset<T, GuardianUpdateArgs>
  ): CheckSelect<T, Prisma__GuardianClient<Guardian>, Prisma__GuardianClient<GuardianGetPayload<T>>>
  /**
   * Delete zero or more Guardians.
   * @param {GuardianDeleteManyArgs} args - Arguments to filter Guardians to delete.
   * @example
   * // Delete a few Guardians
   * const { count } = await prisma.guardian.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends GuardianDeleteManyArgs>(
    args: Subset<T, GuardianDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Guardians.
   * @param {GuardianUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Guardians
   * const guardian = await prisma.guardian.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends GuardianUpdateManyArgs>(
    args: Subset<T, GuardianUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Guardian.
   * @param {GuardianUpsertArgs} args - Arguments to update or create a Guardian.
   * @example
   * // Update or create a Guardian
   * const guardian = await prisma.guardian.upsert({
   *   create: {
   *     // ... data to create a Guardian
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Guardian we want to update
   *   }
   * })
  **/
  upsert<T extends GuardianUpsertArgs>(
    args: Subset<T, GuardianUpsertArgs>
  ): CheckSelect<T, Prisma__GuardianClient<Guardian>, Prisma__GuardianClient<GuardianGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyGuardianArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateGuardianArgs>(args: Subset<T, AggregateGuardianArgs>): Promise<GetGuardianAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Guardian.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__GuardianClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  orphans<T extends FindManyOrphanArgs = {}>(args?: Subset<T, FindManyOrphanArgs>): CheckSelect<T, Promise<Array<Orphan>>, Promise<Array<OrphanGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Guardian findOne
 */
export type FindOneGuardianArgs = {
  /**
   * Select specific fields to fetch from the Guardian
  **/
  select?: GuardianSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GuardianInclude | null
  /**
   * Filter, which Guardian to fetch.
  **/
  where: GuardianWhereUniqueInput
}


/**
 * Guardian findMany
 */
export type FindManyGuardianArgs = {
  /**
   * Select specific fields to fetch from the Guardian
  **/
  select?: GuardianSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GuardianInclude | null
  /**
   * Filter, which Guardians to fetch.
  **/
  where?: GuardianWhereInput
  /**
   * Determine the order of the Guardians to fetch.
  **/
  orderBy?: Enumerable<GuardianOrderByInput>
  /**
   * Sets the position for listing Guardians.
  **/
  cursor?: GuardianWhereUniqueInput
  /**
   * The number of Guardians to fetch. If negative number, it will take Guardians before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Guardians.
  **/
  skip?: number
  distinct?: Enumerable<GuardianDistinctFieldEnum>
}


/**
 * Guardian create
 */
export type GuardianCreateArgs = {
  /**
   * Select specific fields to fetch from the Guardian
  **/
  select?: GuardianSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GuardianInclude | null
  /**
   * The data needed to create a Guardian.
  **/
  data: GuardianCreateInput
}


/**
 * Guardian update
 */
export type GuardianUpdateArgs = {
  /**
   * Select specific fields to fetch from the Guardian
  **/
  select?: GuardianSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GuardianInclude | null
  /**
   * The data needed to update a Guardian.
  **/
  data: GuardianUpdateInput
  /**
   * Choose, which Guardian to update.
  **/
  where: GuardianWhereUniqueInput
}


/**
 * Guardian updateMany
 */
export type GuardianUpdateManyArgs = {
  data: GuardianUpdateManyMutationInput
  where?: GuardianWhereInput
}


/**
 * Guardian upsert
 */
export type GuardianUpsertArgs = {
  /**
   * Select specific fields to fetch from the Guardian
  **/
  select?: GuardianSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GuardianInclude | null
  /**
   * The filter to search for the Guardian to update in case it exists.
  **/
  where: GuardianWhereUniqueInput
  /**
   * In case the Guardian found by the `where` argument doesn't exist, create a new Guardian with this data.
  **/
  create: GuardianCreateInput
  /**
   * In case the Guardian was found with the provided `where` argument, update it with this data.
  **/
  update: GuardianUpdateInput
}


/**
 * Guardian delete
 */
export type GuardianDeleteArgs = {
  /**
   * Select specific fields to fetch from the Guardian
  **/
  select?: GuardianSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GuardianInclude | null
  /**
   * Filter which Guardian to delete.
  **/
  where: GuardianWhereUniqueInput
}


/**
 * Guardian deleteMany
 */
export type GuardianDeleteManyArgs = {
  where?: GuardianWhereInput
}


/**
 * Guardian without action
 */
export type GuardianArgs = {
  /**
   * Select specific fields to fetch from the Guardian
  **/
  select?: GuardianSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: GuardianInclude | null
}



/**
 * Model Iga_property
 */

export type Iga_property = {
  id: number
  ownershipStatus: string
  otherProperty: string | null
}


export type AggregateIga_property = {
  count: number
  avg: Iga_propertyAvgAggregateOutputType | null
  sum: Iga_propertySumAggregateOutputType | null
  min: Iga_propertyMinAggregateOutputType | null
  max: Iga_propertyMaxAggregateOutputType | null
}

export type Iga_propertyAvgAggregateOutputType = {
  id: number
}

export type Iga_propertySumAggregateOutputType = {
  id: number
}

export type Iga_propertyMinAggregateOutputType = {
  id: number
}

export type Iga_propertyMaxAggregateOutputType = {
  id: number
}


export type Iga_propertyAvgAggregateInputType = {
  id?: true
}

export type Iga_propertySumAggregateInputType = {
  id?: true
}

export type Iga_propertyMinAggregateInputType = {
  id?: true
}

export type Iga_propertyMaxAggregateInputType = {
  id?: true
}

export type AggregateIga_propertyArgs = {
  where?: Iga_propertyWhereInput
  orderBy?: Enumerable<Iga_propertyOrderByInput>
  cursor?: Iga_propertyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<Iga_propertyDistinctFieldEnum>
  count?: true
  avg?: Iga_propertyAvgAggregateInputType
  sum?: Iga_propertySumAggregateInputType
  min?: Iga_propertyMinAggregateInputType
  max?: Iga_propertyMaxAggregateInputType
}

export type GetIga_propertyAggregateType<T extends AggregateIga_propertyArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetIga_propertyAggregateScalarType<T[P]>
}

export type GetIga_propertyAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof Iga_propertyAvgAggregateOutputType ? Iga_propertyAvgAggregateOutputType[P] : never
}
    
    

export type Iga_propertySelect = {
  id?: boolean
  ownershipStatus?: boolean
  otherProperty?: boolean
  orphans?: boolean | FindManyOrphanArgs
}

export type Iga_propertyInclude = {
  orphans?: boolean | FindManyOrphanArgs
}

export type Iga_propertyGetPayload<
  S extends boolean | null | undefined | Iga_propertyArgs,
  U = keyof S
> = S extends true
  ? Iga_property
  : S extends undefined
  ? never
  : S extends Iga_propertyArgs | FindManyIga_propertyArgs
  ? 'include' extends U
    ? Iga_property  & {
      [P in TrueKeys<S['include']>]:
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Iga_property ? Iga_property[P]
: 
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['select'][P]>> : never
    }
  : Iga_property
: Iga_property


export interface Iga_propertyDelegate {
  /**
   * Find zero or one Iga_property.
   * @param {FindOneIga_propertyArgs} args - Arguments to find a Iga_property
   * @example
   * // Get one Iga_property
   * const iga_property = await prisma.iga_property.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneIga_propertyArgs>(
    args: Subset<T, FindOneIga_propertyArgs>
  ): CheckSelect<T, Prisma__Iga_propertyClient<Iga_property | null>, Prisma__Iga_propertyClient<Iga_propertyGetPayload<T> | null>>
  /**
   * Find zero or more Iga_properties.
   * @param {FindManyIga_propertyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Iga_properties
   * const iga_properties = await prisma.iga_property.findMany()
   * 
   * // Get first 10 Iga_properties
   * const iga_properties = await prisma.iga_property.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const iga_propertyWithIdOnly = await prisma.iga_property.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyIga_propertyArgs>(
    args?: Subset<T, FindManyIga_propertyArgs>
  ): CheckSelect<T, Promise<Array<Iga_property>>, Promise<Array<Iga_propertyGetPayload<T>>>>
  /**
   * Create a Iga_property.
   * @param {Iga_propertyCreateArgs} args - Arguments to create a Iga_property.
   * @example
   * // Create one Iga_property
   * const Iga_property = await prisma.iga_property.create({
   *   data: {
   *     // ... data to create a Iga_property
   *   }
   * })
   * 
  **/
  create<T extends Iga_propertyCreateArgs>(
    args: Subset<T, Iga_propertyCreateArgs>
  ): CheckSelect<T, Prisma__Iga_propertyClient<Iga_property>, Prisma__Iga_propertyClient<Iga_propertyGetPayload<T>>>
  /**
   * Delete a Iga_property.
   * @param {Iga_propertyDeleteArgs} args - Arguments to delete one Iga_property.
   * @example
   * // Delete one Iga_property
   * const Iga_property = await prisma.iga_property.delete({
   *   where: {
   *     // ... filter to delete one Iga_property
   *   }
   * })
   * 
  **/
  delete<T extends Iga_propertyDeleteArgs>(
    args: Subset<T, Iga_propertyDeleteArgs>
  ): CheckSelect<T, Prisma__Iga_propertyClient<Iga_property>, Prisma__Iga_propertyClient<Iga_propertyGetPayload<T>>>
  /**
   * Update one Iga_property.
   * @param {Iga_propertyUpdateArgs} args - Arguments to update one Iga_property.
   * @example
   * // Update one Iga_property
   * const iga_property = await prisma.iga_property.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends Iga_propertyUpdateArgs>(
    args: Subset<T, Iga_propertyUpdateArgs>
  ): CheckSelect<T, Prisma__Iga_propertyClient<Iga_property>, Prisma__Iga_propertyClient<Iga_propertyGetPayload<T>>>
  /**
   * Delete zero or more Iga_properties.
   * @param {Iga_propertyDeleteManyArgs} args - Arguments to filter Iga_properties to delete.
   * @example
   * // Delete a few Iga_properties
   * const { count } = await prisma.iga_property.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends Iga_propertyDeleteManyArgs>(
    args: Subset<T, Iga_propertyDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Iga_properties.
   * @param {Iga_propertyUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Iga_properties
   * const iga_property = await prisma.iga_property.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends Iga_propertyUpdateManyArgs>(
    args: Subset<T, Iga_propertyUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Iga_property.
   * @param {Iga_propertyUpsertArgs} args - Arguments to update or create a Iga_property.
   * @example
   * // Update or create a Iga_property
   * const iga_property = await prisma.iga_property.upsert({
   *   create: {
   *     // ... data to create a Iga_property
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Iga_property we want to update
   *   }
   * })
  **/
  upsert<T extends Iga_propertyUpsertArgs>(
    args: Subset<T, Iga_propertyUpsertArgs>
  ): CheckSelect<T, Prisma__Iga_propertyClient<Iga_property>, Prisma__Iga_propertyClient<Iga_propertyGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyIga_propertyArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateIga_propertyArgs>(args: Subset<T, AggregateIga_propertyArgs>): Promise<GetIga_propertyAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Iga_property.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__Iga_propertyClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  orphans<T extends FindManyOrphanArgs = {}>(args?: Subset<T, FindManyOrphanArgs>): CheckSelect<T, Promise<Array<Orphan>>, Promise<Array<OrphanGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Iga_property findOne
 */
export type FindOneIga_propertyArgs = {
  /**
   * Select specific fields to fetch from the Iga_property
  **/
  select?: Iga_propertySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Iga_propertyInclude | null
  /**
   * Filter, which Iga_property to fetch.
  **/
  where: Iga_propertyWhereUniqueInput
}


/**
 * Iga_property findMany
 */
export type FindManyIga_propertyArgs = {
  /**
   * Select specific fields to fetch from the Iga_property
  **/
  select?: Iga_propertySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Iga_propertyInclude | null
  /**
   * Filter, which Iga_properties to fetch.
  **/
  where?: Iga_propertyWhereInput
  /**
   * Determine the order of the Iga_properties to fetch.
  **/
  orderBy?: Enumerable<Iga_propertyOrderByInput>
  /**
   * Sets the position for listing Iga_properties.
  **/
  cursor?: Iga_propertyWhereUniqueInput
  /**
   * The number of Iga_properties to fetch. If negative number, it will take Iga_properties before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Iga_properties.
  **/
  skip?: number
  distinct?: Enumerable<Iga_propertyDistinctFieldEnum>
}


/**
 * Iga_property create
 */
export type Iga_propertyCreateArgs = {
  /**
   * Select specific fields to fetch from the Iga_property
  **/
  select?: Iga_propertySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Iga_propertyInclude | null
  /**
   * The data needed to create a Iga_property.
  **/
  data: Iga_propertyCreateInput
}


/**
 * Iga_property update
 */
export type Iga_propertyUpdateArgs = {
  /**
   * Select specific fields to fetch from the Iga_property
  **/
  select?: Iga_propertySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Iga_propertyInclude | null
  /**
   * The data needed to update a Iga_property.
  **/
  data: Iga_propertyUpdateInput
  /**
   * Choose, which Iga_property to update.
  **/
  where: Iga_propertyWhereUniqueInput
}


/**
 * Iga_property updateMany
 */
export type Iga_propertyUpdateManyArgs = {
  data: Iga_propertyUpdateManyMutationInput
  where?: Iga_propertyWhereInput
}


/**
 * Iga_property upsert
 */
export type Iga_propertyUpsertArgs = {
  /**
   * Select specific fields to fetch from the Iga_property
  **/
  select?: Iga_propertySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Iga_propertyInclude | null
  /**
   * The filter to search for the Iga_property to update in case it exists.
  **/
  where: Iga_propertyWhereUniqueInput
  /**
   * In case the Iga_property found by the `where` argument doesn't exist, create a new Iga_property with this data.
  **/
  create: Iga_propertyCreateInput
  /**
   * In case the Iga_property was found with the provided `where` argument, update it with this data.
  **/
  update: Iga_propertyUpdateInput
}


/**
 * Iga_property delete
 */
export type Iga_propertyDeleteArgs = {
  /**
   * Select specific fields to fetch from the Iga_property
  **/
  select?: Iga_propertySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Iga_propertyInclude | null
  /**
   * Filter which Iga_property to delete.
  **/
  where: Iga_propertyWhereUniqueInput
}


/**
 * Iga_property deleteMany
 */
export type Iga_propertyDeleteManyArgs = {
  where?: Iga_propertyWhereInput
}


/**
 * Iga_property without action
 */
export type Iga_propertyArgs = {
  /**
   * Select specific fields to fetch from the Iga_property
  **/
  select?: Iga_propertySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Iga_propertyInclude | null
}



/**
 * Model Mother
 */

export type Mother = {
  id: number
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: Date
  phoneNumber: number
  job: number
  maritalStatus: string
  vitalStatus: string
  monthlyExpense: number
}


export type AggregateMother = {
  count: number
  avg: MotherAvgAggregateOutputType | null
  sum: MotherSumAggregateOutputType | null
  min: MotherMinAggregateOutputType | null
  max: MotherMaxAggregateOutputType | null
}

export type MotherAvgAggregateOutputType = {
  id: number
  phoneNumber: number
  job: number
  monthlyExpense: number
}

export type MotherSumAggregateOutputType = {
  id: number
  phoneNumber: number
  job: number
  monthlyExpense: number
}

export type MotherMinAggregateOutputType = {
  id: number
  phoneNumber: number
  job: number
  monthlyExpense: number
}

export type MotherMaxAggregateOutputType = {
  id: number
  phoneNumber: number
  job: number
  monthlyExpense: number
}


export type MotherAvgAggregateInputType = {
  id?: true
  phoneNumber?: true
  job?: true
  monthlyExpense?: true
}

export type MotherSumAggregateInputType = {
  id?: true
  phoneNumber?: true
  job?: true
  monthlyExpense?: true
}

export type MotherMinAggregateInputType = {
  id?: true
  phoneNumber?: true
  job?: true
  monthlyExpense?: true
}

export type MotherMaxAggregateInputType = {
  id?: true
  phoneNumber?: true
  job?: true
  monthlyExpense?: true
}

export type AggregateMotherArgs = {
  where?: MotherWhereInput
  orderBy?: Enumerable<MotherOrderByInput>
  cursor?: MotherWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MotherDistinctFieldEnum>
  count?: true
  avg?: MotherAvgAggregateInputType
  sum?: MotherSumAggregateInputType
  min?: MotherMinAggregateInputType
  max?: MotherMaxAggregateInputType
}

export type GetMotherAggregateType<T extends AggregateMotherArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetMotherAggregateScalarType<T[P]>
}

export type GetMotherAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof MotherAvgAggregateOutputType ? MotherAvgAggregateOutputType[P] : never
}
    
    

export type MotherSelect = {
  id?: boolean
  firstName?: boolean
  middleName?: boolean
  lastName?: boolean
  dateOfBirth?: boolean
  phoneNumber?: boolean
  job?: boolean
  maritalStatus?: boolean
  vitalStatus?: boolean
  monthlyExpense?: boolean
  motherjob?: boolean | MotherJobArgs
  orphans?: boolean | FindManyOrphanArgs
}

export type MotherInclude = {
  motherjob?: boolean | MotherJobArgs
  orphans?: boolean | FindManyOrphanArgs
}

export type MotherGetPayload<
  S extends boolean | null | undefined | MotherArgs,
  U = keyof S
> = S extends true
  ? Mother
  : S extends undefined
  ? never
  : S extends MotherArgs | FindManyMotherArgs
  ? 'include' extends U
    ? Mother  & {
      [P in TrueKeys<S['include']>]:
      P extends 'motherjob'
      ? MotherJobGetPayload<S['include'][P]> :
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Mother ? Mother[P]
: 
      P extends 'motherjob'
      ? MotherJobGetPayload<S['select'][P]> :
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['select'][P]>> : never
    }
  : Mother
: Mother


export interface MotherDelegate {
  /**
   * Find zero or one Mother.
   * @param {FindOneMotherArgs} args - Arguments to find a Mother
   * @example
   * // Get one Mother
   * const mother = await prisma.mother.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneMotherArgs>(
    args: Subset<T, FindOneMotherArgs>
  ): CheckSelect<T, Prisma__MotherClient<Mother | null>, Prisma__MotherClient<MotherGetPayload<T> | null>>
  /**
   * Find zero or more Mothers.
   * @param {FindManyMotherArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Mothers
   * const mothers = await prisma.mother.findMany()
   * 
   * // Get first 10 Mothers
   * const mothers = await prisma.mother.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const motherWithIdOnly = await prisma.mother.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyMotherArgs>(
    args?: Subset<T, FindManyMotherArgs>
  ): CheckSelect<T, Promise<Array<Mother>>, Promise<Array<MotherGetPayload<T>>>>
  /**
   * Create a Mother.
   * @param {MotherCreateArgs} args - Arguments to create a Mother.
   * @example
   * // Create one Mother
   * const Mother = await prisma.mother.create({
   *   data: {
   *     // ... data to create a Mother
   *   }
   * })
   * 
  **/
  create<T extends MotherCreateArgs>(
    args: Subset<T, MotherCreateArgs>
  ): CheckSelect<T, Prisma__MotherClient<Mother>, Prisma__MotherClient<MotherGetPayload<T>>>
  /**
   * Delete a Mother.
   * @param {MotherDeleteArgs} args - Arguments to delete one Mother.
   * @example
   * // Delete one Mother
   * const Mother = await prisma.mother.delete({
   *   where: {
   *     // ... filter to delete one Mother
   *   }
   * })
   * 
  **/
  delete<T extends MotherDeleteArgs>(
    args: Subset<T, MotherDeleteArgs>
  ): CheckSelect<T, Prisma__MotherClient<Mother>, Prisma__MotherClient<MotherGetPayload<T>>>
  /**
   * Update one Mother.
   * @param {MotherUpdateArgs} args - Arguments to update one Mother.
   * @example
   * // Update one Mother
   * const mother = await prisma.mother.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends MotherUpdateArgs>(
    args: Subset<T, MotherUpdateArgs>
  ): CheckSelect<T, Prisma__MotherClient<Mother>, Prisma__MotherClient<MotherGetPayload<T>>>
  /**
   * Delete zero or more Mothers.
   * @param {MotherDeleteManyArgs} args - Arguments to filter Mothers to delete.
   * @example
   * // Delete a few Mothers
   * const { count } = await prisma.mother.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends MotherDeleteManyArgs>(
    args: Subset<T, MotherDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Mothers.
   * @param {MotherUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Mothers
   * const mother = await prisma.mother.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends MotherUpdateManyArgs>(
    args: Subset<T, MotherUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Mother.
   * @param {MotherUpsertArgs} args - Arguments to update or create a Mother.
   * @example
   * // Update or create a Mother
   * const mother = await prisma.mother.upsert({
   *   create: {
   *     // ... data to create a Mother
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Mother we want to update
   *   }
   * })
  **/
  upsert<T extends MotherUpsertArgs>(
    args: Subset<T, MotherUpsertArgs>
  ): CheckSelect<T, Prisma__MotherClient<Mother>, Prisma__MotherClient<MotherGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyMotherArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMotherArgs>(args: Subset<T, AggregateMotherArgs>): Promise<GetMotherAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Mother.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__MotherClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  motherjob<T extends MotherJobArgs = {}>(args?: Subset<T, MotherJobArgs>): CheckSelect<T, Prisma__MotherJobClient<MotherJob | null>, Prisma__MotherJobClient<MotherJobGetPayload<T> | null>>;

  orphans<T extends FindManyOrphanArgs = {}>(args?: Subset<T, FindManyOrphanArgs>): CheckSelect<T, Promise<Array<Orphan>>, Promise<Array<OrphanGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Mother findOne
 */
export type FindOneMotherArgs = {
  /**
   * Select specific fields to fetch from the Mother
  **/
  select?: MotherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherInclude | null
  /**
   * Filter, which Mother to fetch.
  **/
  where: MotherWhereUniqueInput
}


/**
 * Mother findMany
 */
export type FindManyMotherArgs = {
  /**
   * Select specific fields to fetch from the Mother
  **/
  select?: MotherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherInclude | null
  /**
   * Filter, which Mothers to fetch.
  **/
  where?: MotherWhereInput
  /**
   * Determine the order of the Mothers to fetch.
  **/
  orderBy?: Enumerable<MotherOrderByInput>
  /**
   * Sets the position for listing Mothers.
  **/
  cursor?: MotherWhereUniqueInput
  /**
   * The number of Mothers to fetch. If negative number, it will take Mothers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Mothers.
  **/
  skip?: number
  distinct?: Enumerable<MotherDistinctFieldEnum>
}


/**
 * Mother create
 */
export type MotherCreateArgs = {
  /**
   * Select specific fields to fetch from the Mother
  **/
  select?: MotherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherInclude | null
  /**
   * The data needed to create a Mother.
  **/
  data: MotherCreateInput
}


/**
 * Mother update
 */
export type MotherUpdateArgs = {
  /**
   * Select specific fields to fetch from the Mother
  **/
  select?: MotherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherInclude | null
  /**
   * The data needed to update a Mother.
  **/
  data: MotherUpdateInput
  /**
   * Choose, which Mother to update.
  **/
  where: MotherWhereUniqueInput
}


/**
 * Mother updateMany
 */
export type MotherUpdateManyArgs = {
  data: MotherUpdateManyMutationInput
  where?: MotherWhereInput
}


/**
 * Mother upsert
 */
export type MotherUpsertArgs = {
  /**
   * Select specific fields to fetch from the Mother
  **/
  select?: MotherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherInclude | null
  /**
   * The filter to search for the Mother to update in case it exists.
  **/
  where: MotherWhereUniqueInput
  /**
   * In case the Mother found by the `where` argument doesn't exist, create a new Mother with this data.
  **/
  create: MotherCreateInput
  /**
   * In case the Mother was found with the provided `where` argument, update it with this data.
  **/
  update: MotherUpdateInput
}


/**
 * Mother delete
 */
export type MotherDeleteArgs = {
  /**
   * Select specific fields to fetch from the Mother
  **/
  select?: MotherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherInclude | null
  /**
   * Filter which Mother to delete.
  **/
  where: MotherWhereUniqueInput
}


/**
 * Mother deleteMany
 */
export type MotherDeleteManyArgs = {
  where?: MotherWhereInput
}


/**
 * Mother without action
 */
export type MotherArgs = {
  /**
   * Select specific fields to fetch from the Mother
  **/
  select?: MotherSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherInclude | null
}



/**
 * Model MotherJob
 */

export type MotherJob = {
  id: number
  currentJobTitle: string | null
  monthlyIncome: number | null
}


export type AggregateMotherJob = {
  count: number
  avg: MotherJobAvgAggregateOutputType | null
  sum: MotherJobSumAggregateOutputType | null
  min: MotherJobMinAggregateOutputType | null
  max: MotherJobMaxAggregateOutputType | null
}

export type MotherJobAvgAggregateOutputType = {
  id: number
  monthlyIncome: number
}

export type MotherJobSumAggregateOutputType = {
  id: number
  monthlyIncome: number | null
}

export type MotherJobMinAggregateOutputType = {
  id: number
  monthlyIncome: number | null
}

export type MotherJobMaxAggregateOutputType = {
  id: number
  monthlyIncome: number | null
}


export type MotherJobAvgAggregateInputType = {
  id?: true
  monthlyIncome?: true
}

export type MotherJobSumAggregateInputType = {
  id?: true
  monthlyIncome?: true
}

export type MotherJobMinAggregateInputType = {
  id?: true
  monthlyIncome?: true
}

export type MotherJobMaxAggregateInputType = {
  id?: true
  monthlyIncome?: true
}

export type AggregateMotherJobArgs = {
  where?: MotherJobWhereInput
  orderBy?: Enumerable<MotherJobOrderByInput>
  cursor?: MotherJobWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MotherJobDistinctFieldEnum>
  count?: true
  avg?: MotherJobAvgAggregateInputType
  sum?: MotherJobSumAggregateInputType
  min?: MotherJobMinAggregateInputType
  max?: MotherJobMaxAggregateInputType
}

export type GetMotherJobAggregateType<T extends AggregateMotherJobArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetMotherJobAggregateScalarType<T[P]>
}

export type GetMotherJobAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof MotherJobAvgAggregateOutputType ? MotherJobAvgAggregateOutputType[P] : never
}
    
    

export type MotherJobSelect = {
  id?: boolean
  currentJobTitle?: boolean
  monthlyIncome?: boolean
  mother?: boolean | MotherArgs
}

export type MotherJobInclude = {
  mother?: boolean | MotherArgs
}

export type MotherJobGetPayload<
  S extends boolean | null | undefined | MotherJobArgs,
  U = keyof S
> = S extends true
  ? MotherJob
  : S extends undefined
  ? never
  : S extends MotherJobArgs | FindManyMotherJobArgs
  ? 'include' extends U
    ? MotherJob  & {
      [P in TrueKeys<S['include']>]:
      P extends 'mother'
      ? MotherGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof MotherJob ? MotherJob[P]
: 
      P extends 'mother'
      ? MotherGetPayload<S['select'][P]> : never
    }
  : MotherJob
: MotherJob


export interface MotherJobDelegate {
  /**
   * Find zero or one MotherJob.
   * @param {FindOneMotherJobArgs} args - Arguments to find a MotherJob
   * @example
   * // Get one MotherJob
   * const motherJob = await prisma.motherJob.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneMotherJobArgs>(
    args: Subset<T, FindOneMotherJobArgs>
  ): CheckSelect<T, Prisma__MotherJobClient<MotherJob | null>, Prisma__MotherJobClient<MotherJobGetPayload<T> | null>>
  /**
   * Find zero or more MotherJobs.
   * @param {FindManyMotherJobArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all MotherJobs
   * const motherJobs = await prisma.motherJob.findMany()
   * 
   * // Get first 10 MotherJobs
   * const motherJobs = await prisma.motherJob.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const motherJobWithIdOnly = await prisma.motherJob.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyMotherJobArgs>(
    args?: Subset<T, FindManyMotherJobArgs>
  ): CheckSelect<T, Promise<Array<MotherJob>>, Promise<Array<MotherJobGetPayload<T>>>>
  /**
   * Create a MotherJob.
   * @param {MotherJobCreateArgs} args - Arguments to create a MotherJob.
   * @example
   * // Create one MotherJob
   * const MotherJob = await prisma.motherJob.create({
   *   data: {
   *     // ... data to create a MotherJob
   *   }
   * })
   * 
  **/
  create<T extends MotherJobCreateArgs>(
    args: Subset<T, MotherJobCreateArgs>
  ): CheckSelect<T, Prisma__MotherJobClient<MotherJob>, Prisma__MotherJobClient<MotherJobGetPayload<T>>>
  /**
   * Delete a MotherJob.
   * @param {MotherJobDeleteArgs} args - Arguments to delete one MotherJob.
   * @example
   * // Delete one MotherJob
   * const MotherJob = await prisma.motherJob.delete({
   *   where: {
   *     // ... filter to delete one MotherJob
   *   }
   * })
   * 
  **/
  delete<T extends MotherJobDeleteArgs>(
    args: Subset<T, MotherJobDeleteArgs>
  ): CheckSelect<T, Prisma__MotherJobClient<MotherJob>, Prisma__MotherJobClient<MotherJobGetPayload<T>>>
  /**
   * Update one MotherJob.
   * @param {MotherJobUpdateArgs} args - Arguments to update one MotherJob.
   * @example
   * // Update one MotherJob
   * const motherJob = await prisma.motherJob.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends MotherJobUpdateArgs>(
    args: Subset<T, MotherJobUpdateArgs>
  ): CheckSelect<T, Prisma__MotherJobClient<MotherJob>, Prisma__MotherJobClient<MotherJobGetPayload<T>>>
  /**
   * Delete zero or more MotherJobs.
   * @param {MotherJobDeleteManyArgs} args - Arguments to filter MotherJobs to delete.
   * @example
   * // Delete a few MotherJobs
   * const { count } = await prisma.motherJob.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends MotherJobDeleteManyArgs>(
    args: Subset<T, MotherJobDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more MotherJobs.
   * @param {MotherJobUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many MotherJobs
   * const motherJob = await prisma.motherJob.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends MotherJobUpdateManyArgs>(
    args: Subset<T, MotherJobUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one MotherJob.
   * @param {MotherJobUpsertArgs} args - Arguments to update or create a MotherJob.
   * @example
   * // Update or create a MotherJob
   * const motherJob = await prisma.motherJob.upsert({
   *   create: {
   *     // ... data to create a MotherJob
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the MotherJob we want to update
   *   }
   * })
  **/
  upsert<T extends MotherJobUpsertArgs>(
    args: Subset<T, MotherJobUpsertArgs>
  ): CheckSelect<T, Prisma__MotherJobClient<MotherJob>, Prisma__MotherJobClient<MotherJobGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyMotherJobArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMotherJobArgs>(args: Subset<T, AggregateMotherJobArgs>): Promise<GetMotherJobAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for MotherJob.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__MotherJobClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  mother<T extends MotherArgs = {}>(args?: Subset<T, MotherArgs>): CheckSelect<T, Prisma__MotherClient<Mother | null>, Prisma__MotherClient<MotherGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * MotherJob findOne
 */
export type FindOneMotherJobArgs = {
  /**
   * Select specific fields to fetch from the MotherJob
  **/
  select?: MotherJobSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherJobInclude | null
  /**
   * Filter, which MotherJob to fetch.
  **/
  where: MotherJobWhereUniqueInput
}


/**
 * MotherJob findMany
 */
export type FindManyMotherJobArgs = {
  /**
   * Select specific fields to fetch from the MotherJob
  **/
  select?: MotherJobSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherJobInclude | null
  /**
   * Filter, which MotherJobs to fetch.
  **/
  where?: MotherJobWhereInput
  /**
   * Determine the order of the MotherJobs to fetch.
  **/
  orderBy?: Enumerable<MotherJobOrderByInput>
  /**
   * Sets the position for listing MotherJobs.
  **/
  cursor?: MotherJobWhereUniqueInput
  /**
   * The number of MotherJobs to fetch. If negative number, it will take MotherJobs before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` MotherJobs.
  **/
  skip?: number
  distinct?: Enumerable<MotherJobDistinctFieldEnum>
}


/**
 * MotherJob create
 */
export type MotherJobCreateArgs = {
  /**
   * Select specific fields to fetch from the MotherJob
  **/
  select?: MotherJobSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherJobInclude | null
  /**
   * The data needed to create a MotherJob.
  **/
  data: MotherJobCreateInput
}


/**
 * MotherJob update
 */
export type MotherJobUpdateArgs = {
  /**
   * Select specific fields to fetch from the MotherJob
  **/
  select?: MotherJobSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherJobInclude | null
  /**
   * The data needed to update a MotherJob.
  **/
  data: MotherJobUpdateInput
  /**
   * Choose, which MotherJob to update.
  **/
  where: MotherJobWhereUniqueInput
}


/**
 * MotherJob updateMany
 */
export type MotherJobUpdateManyArgs = {
  data: MotherJobUpdateManyMutationInput
  where?: MotherJobWhereInput
}


/**
 * MotherJob upsert
 */
export type MotherJobUpsertArgs = {
  /**
   * Select specific fields to fetch from the MotherJob
  **/
  select?: MotherJobSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherJobInclude | null
  /**
   * The filter to search for the MotherJob to update in case it exists.
  **/
  where: MotherJobWhereUniqueInput
  /**
   * In case the MotherJob found by the `where` argument doesn't exist, create a new MotherJob with this data.
  **/
  create: MotherJobCreateInput
  /**
   * In case the MotherJob was found with the provided `where` argument, update it with this data.
  **/
  update: MotherJobUpdateInput
}


/**
 * MotherJob delete
 */
export type MotherJobDeleteArgs = {
  /**
   * Select specific fields to fetch from the MotherJob
  **/
  select?: MotherJobSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherJobInclude | null
  /**
   * Filter which MotherJob to delete.
  **/
  where: MotherJobWhereUniqueInput
}


/**
 * MotherJob deleteMany
 */
export type MotherJobDeleteManyArgs = {
  where?: MotherJobWhereInput
}


/**
 * MotherJob without action
 */
export type MotherJobArgs = {
  /**
   * Select specific fields to fetch from the MotherJob
  **/
  select?: MotherJobSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MotherJobInclude | null
}



/**
 * Model Orphan
 */

export type Orphan = {
  id: number
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  fatherId: number
  motherId: number
  guardianId: number
  groupId: number
  siblingId: number
  IGA_PropertyId: number
  educationId: number
}


export type AggregateOrphan = {
  count: number
  avg: OrphanAvgAggregateOutputType | null
  sum: OrphanSumAggregateOutputType | null
  min: OrphanMinAggregateOutputType | null
  max: OrphanMaxAggregateOutputType | null
}

export type OrphanAvgAggregateOutputType = {
  id: number
  numberOfSponserdSiblings: number
  fatherId: number
  motherId: number
  guardianId: number
  groupId: number
  siblingId: number
  IGA_PropertyId: number
  educationId: number
}

export type OrphanSumAggregateOutputType = {
  id: number
  numberOfSponserdSiblings: number
  fatherId: number
  motherId: number
  guardianId: number
  groupId: number
  siblingId: number
  IGA_PropertyId: number
  educationId: number
}

export type OrphanMinAggregateOutputType = {
  id: number
  numberOfSponserdSiblings: number
  fatherId: number
  motherId: number
  guardianId: number
  groupId: number
  siblingId: number
  IGA_PropertyId: number
  educationId: number
}

export type OrphanMaxAggregateOutputType = {
  id: number
  numberOfSponserdSiblings: number
  fatherId: number
  motherId: number
  guardianId: number
  groupId: number
  siblingId: number
  IGA_PropertyId: number
  educationId: number
}


export type OrphanAvgAggregateInputType = {
  id?: true
  numberOfSponserdSiblings?: true
  fatherId?: true
  motherId?: true
  guardianId?: true
  groupId?: true
  siblingId?: true
  IGA_PropertyId?: true
  educationId?: true
}

export type OrphanSumAggregateInputType = {
  id?: true
  numberOfSponserdSiblings?: true
  fatherId?: true
  motherId?: true
  guardianId?: true
  groupId?: true
  siblingId?: true
  IGA_PropertyId?: true
  educationId?: true
}

export type OrphanMinAggregateInputType = {
  id?: true
  numberOfSponserdSiblings?: true
  fatherId?: true
  motherId?: true
  guardianId?: true
  groupId?: true
  siblingId?: true
  IGA_PropertyId?: true
  educationId?: true
}

export type OrphanMaxAggregateInputType = {
  id?: true
  numberOfSponserdSiblings?: true
  fatherId?: true
  motherId?: true
  guardianId?: true
  groupId?: true
  siblingId?: true
  IGA_PropertyId?: true
  educationId?: true
}

export type AggregateOrphanArgs = {
  where?: OrphanWhereInput
  orderBy?: Enumerable<OrphanOrderByInput>
  cursor?: OrphanWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OrphanDistinctFieldEnum>
  count?: true
  avg?: OrphanAvgAggregateInputType
  sum?: OrphanSumAggregateInputType
  min?: OrphanMinAggregateInputType
  max?: OrphanMaxAggregateInputType
}

export type GetOrphanAggregateType<T extends AggregateOrphanArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetOrphanAggregateScalarType<T[P]>
}

export type GetOrphanAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof OrphanAvgAggregateOutputType ? OrphanAvgAggregateOutputType[P] : never
}
    
    

export type OrphanSelect = {
  id?: boolean
  firstName?: boolean
  fatherName?: boolean
  grandFatherName?: boolean
  greatGrandFatherName?: boolean
  gender?: boolean
  placeOfBirth?: boolean
  dateOfBirth?: boolean
  numberOfSponserdSiblings?: boolean
  physicalHealthStatus?: boolean
  psychologicalHealthStatus?: boolean
  otherHealthIssues?: boolean
  photoPortraitUrl?: boolean
  photoLongUrl?: boolean
  fatherId?: boolean
  motherId?: boolean
  guardianId?: boolean
  groupId?: boolean
  siblingId?: boolean
  IGA_PropertyId?: boolean
  educationId?: boolean
  siblings?: boolean | FindManySiblingArgs
  iga_property?: boolean | Iga_propertyArgs
  education?: boolean | EducationArgs
  father?: boolean | FatherArgs
  groupoforphans?: boolean | GroupOfOrphansArgs
  guardian?: boolean | GuardianArgs
  mother?: boolean | MotherArgs
}

export type OrphanInclude = {
  siblings?: boolean | FindManySiblingArgs
  iga_property?: boolean | Iga_propertyArgs
  education?: boolean | EducationArgs
  father?: boolean | FatherArgs
  groupoforphans?: boolean | GroupOfOrphansArgs
  guardian?: boolean | GuardianArgs
  mother?: boolean | MotherArgs
}

export type OrphanGetPayload<
  S extends boolean | null | undefined | OrphanArgs,
  U = keyof S
> = S extends true
  ? Orphan
  : S extends undefined
  ? never
  : S extends OrphanArgs | FindManyOrphanArgs
  ? 'include' extends U
    ? Orphan  & {
      [P in TrueKeys<S['include']>]:
      P extends 'siblings'
      ? Array<SiblingGetPayload<S['include'][P]>> :
      P extends 'iga_property'
      ? Iga_propertyGetPayload<S['include'][P]> :
      P extends 'education'
      ? EducationGetPayload<S['include'][P]> :
      P extends 'father'
      ? FatherGetPayload<S['include'][P]> :
      P extends 'groupoforphans'
      ? GroupOfOrphansGetPayload<S['include'][P]> :
      P extends 'guardian'
      ? GuardianGetPayload<S['include'][P]> :
      P extends 'mother'
      ? MotherGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Orphan ? Orphan[P]
: 
      P extends 'siblings'
      ? Array<SiblingGetPayload<S['select'][P]>> :
      P extends 'iga_property'
      ? Iga_propertyGetPayload<S['select'][P]> :
      P extends 'education'
      ? EducationGetPayload<S['select'][P]> :
      P extends 'father'
      ? FatherGetPayload<S['select'][P]> :
      P extends 'groupoforphans'
      ? GroupOfOrphansGetPayload<S['select'][P]> :
      P extends 'guardian'
      ? GuardianGetPayload<S['select'][P]> :
      P extends 'mother'
      ? MotherGetPayload<S['select'][P]> : never
    }
  : Orphan
: Orphan


export interface OrphanDelegate {
  /**
   * Find zero or one Orphan.
   * @param {FindOneOrphanArgs} args - Arguments to find a Orphan
   * @example
   * // Get one Orphan
   * const orphan = await prisma.orphan.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneOrphanArgs>(
    args: Subset<T, FindOneOrphanArgs>
  ): CheckSelect<T, Prisma__OrphanClient<Orphan | null>, Prisma__OrphanClient<OrphanGetPayload<T> | null>>
  /**
   * Find zero or more Orphans.
   * @param {FindManyOrphanArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Orphans
   * const orphans = await prisma.orphan.findMany()
   * 
   * // Get first 10 Orphans
   * const orphans = await prisma.orphan.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const orphanWithIdOnly = await prisma.orphan.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyOrphanArgs>(
    args?: Subset<T, FindManyOrphanArgs>
  ): CheckSelect<T, Promise<Array<Orphan>>, Promise<Array<OrphanGetPayload<T>>>>
  /**
   * Create a Orphan.
   * @param {OrphanCreateArgs} args - Arguments to create a Orphan.
   * @example
   * // Create one Orphan
   * const Orphan = await prisma.orphan.create({
   *   data: {
   *     // ... data to create a Orphan
   *   }
   * })
   * 
  **/
  create<T extends OrphanCreateArgs>(
    args: Subset<T, OrphanCreateArgs>
  ): CheckSelect<T, Prisma__OrphanClient<Orphan>, Prisma__OrphanClient<OrphanGetPayload<T>>>
  /**
   * Delete a Orphan.
   * @param {OrphanDeleteArgs} args - Arguments to delete one Orphan.
   * @example
   * // Delete one Orphan
   * const Orphan = await prisma.orphan.delete({
   *   where: {
   *     // ... filter to delete one Orphan
   *   }
   * })
   * 
  **/
  delete<T extends OrphanDeleteArgs>(
    args: Subset<T, OrphanDeleteArgs>
  ): CheckSelect<T, Prisma__OrphanClient<Orphan>, Prisma__OrphanClient<OrphanGetPayload<T>>>
  /**
   * Update one Orphan.
   * @param {OrphanUpdateArgs} args - Arguments to update one Orphan.
   * @example
   * // Update one Orphan
   * const orphan = await prisma.orphan.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends OrphanUpdateArgs>(
    args: Subset<T, OrphanUpdateArgs>
  ): CheckSelect<T, Prisma__OrphanClient<Orphan>, Prisma__OrphanClient<OrphanGetPayload<T>>>
  /**
   * Delete zero or more Orphans.
   * @param {OrphanDeleteManyArgs} args - Arguments to filter Orphans to delete.
   * @example
   * // Delete a few Orphans
   * const { count } = await prisma.orphan.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends OrphanDeleteManyArgs>(
    args: Subset<T, OrphanDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Orphans.
   * @param {OrphanUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Orphans
   * const orphan = await prisma.orphan.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends OrphanUpdateManyArgs>(
    args: Subset<T, OrphanUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Orphan.
   * @param {OrphanUpsertArgs} args - Arguments to update or create a Orphan.
   * @example
   * // Update or create a Orphan
   * const orphan = await prisma.orphan.upsert({
   *   create: {
   *     // ... data to create a Orphan
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Orphan we want to update
   *   }
   * })
  **/
  upsert<T extends OrphanUpsertArgs>(
    args: Subset<T, OrphanUpsertArgs>
  ): CheckSelect<T, Prisma__OrphanClient<Orphan>, Prisma__OrphanClient<OrphanGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyOrphanArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateOrphanArgs>(args: Subset<T, AggregateOrphanArgs>): Promise<GetOrphanAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Orphan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__OrphanClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  siblings<T extends FindManySiblingArgs = {}>(args?: Subset<T, FindManySiblingArgs>): CheckSelect<T, Promise<Array<Sibling>>, Promise<Array<SiblingGetPayload<T>>>>;

  iga_property<T extends Iga_propertyArgs = {}>(args?: Subset<T, Iga_propertyArgs>): CheckSelect<T, Prisma__Iga_propertyClient<Iga_property | null>, Prisma__Iga_propertyClient<Iga_propertyGetPayload<T> | null>>;

  education<T extends EducationArgs = {}>(args?: Subset<T, EducationArgs>): CheckSelect<T, Prisma__EducationClient<Education | null>, Prisma__EducationClient<EducationGetPayload<T> | null>>;

  father<T extends FatherArgs = {}>(args?: Subset<T, FatherArgs>): CheckSelect<T, Prisma__FatherClient<Father | null>, Prisma__FatherClient<FatherGetPayload<T> | null>>;

  groupoforphans<T extends GroupOfOrphansArgs = {}>(args?: Subset<T, GroupOfOrphansArgs>): CheckSelect<T, Prisma__GroupOfOrphansClient<GroupOfOrphans | null>, Prisma__GroupOfOrphansClient<GroupOfOrphansGetPayload<T> | null>>;

  guardian<T extends GuardianArgs = {}>(args?: Subset<T, GuardianArgs>): CheckSelect<T, Prisma__GuardianClient<Guardian | null>, Prisma__GuardianClient<GuardianGetPayload<T> | null>>;

  mother<T extends MotherArgs = {}>(args?: Subset<T, MotherArgs>): CheckSelect<T, Prisma__MotherClient<Mother | null>, Prisma__MotherClient<MotherGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Orphan findOne
 */
export type FindOneOrphanArgs = {
  /**
   * Select specific fields to fetch from the Orphan
  **/
  select?: OrphanSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrphanInclude | null
  /**
   * Filter, which Orphan to fetch.
  **/
  where: OrphanWhereUniqueInput
}


/**
 * Orphan findMany
 */
export type FindManyOrphanArgs = {
  /**
   * Select specific fields to fetch from the Orphan
  **/
  select?: OrphanSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrphanInclude | null
  /**
   * Filter, which Orphans to fetch.
  **/
  where?: OrphanWhereInput
  /**
   * Determine the order of the Orphans to fetch.
  **/
  orderBy?: Enumerable<OrphanOrderByInput>
  /**
   * Sets the position for listing Orphans.
  **/
  cursor?: OrphanWhereUniqueInput
  /**
   * The number of Orphans to fetch. If negative number, it will take Orphans before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Orphans.
  **/
  skip?: number
  distinct?: Enumerable<OrphanDistinctFieldEnum>
}


/**
 * Orphan create
 */
export type OrphanCreateArgs = {
  /**
   * Select specific fields to fetch from the Orphan
  **/
  select?: OrphanSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrphanInclude | null
  /**
   * The data needed to create a Orphan.
  **/
  data: OrphanCreateInput
}


/**
 * Orphan update
 */
export type OrphanUpdateArgs = {
  /**
   * Select specific fields to fetch from the Orphan
  **/
  select?: OrphanSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrphanInclude | null
  /**
   * The data needed to update a Orphan.
  **/
  data: OrphanUpdateInput
  /**
   * Choose, which Orphan to update.
  **/
  where: OrphanWhereUniqueInput
}


/**
 * Orphan updateMany
 */
export type OrphanUpdateManyArgs = {
  data: OrphanUpdateManyMutationInput
  where?: OrphanWhereInput
}


/**
 * Orphan upsert
 */
export type OrphanUpsertArgs = {
  /**
   * Select specific fields to fetch from the Orphan
  **/
  select?: OrphanSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrphanInclude | null
  /**
   * The filter to search for the Orphan to update in case it exists.
  **/
  where: OrphanWhereUniqueInput
  /**
   * In case the Orphan found by the `where` argument doesn't exist, create a new Orphan with this data.
  **/
  create: OrphanCreateInput
  /**
   * In case the Orphan was found with the provided `where` argument, update it with this data.
  **/
  update: OrphanUpdateInput
}


/**
 * Orphan delete
 */
export type OrphanDeleteArgs = {
  /**
   * Select specific fields to fetch from the Orphan
  **/
  select?: OrphanSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrphanInclude | null
  /**
   * Filter which Orphan to delete.
  **/
  where: OrphanWhereUniqueInput
}


/**
 * Orphan deleteMany
 */
export type OrphanDeleteManyArgs = {
  where?: OrphanWhereInput
}


/**
 * Orphan without action
 */
export type OrphanArgs = {
  /**
   * Select specific fields to fetch from the Orphan
  **/
  select?: OrphanSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrphanInclude | null
}



/**
 * Model Sibling
 */

export type Sibling = {
  id: number
  fullName: string
  gender: string
  age: number
  schoolGrade: string | null
  job: string | null
  maritalStatus: string
  orphanId: number
}


export type AggregateSibling = {
  count: number
  avg: SiblingAvgAggregateOutputType | null
  sum: SiblingSumAggregateOutputType | null
  min: SiblingMinAggregateOutputType | null
  max: SiblingMaxAggregateOutputType | null
}

export type SiblingAvgAggregateOutputType = {
  id: number
  age: number
  orphanId: number
}

export type SiblingSumAggregateOutputType = {
  id: number
  age: number
  orphanId: number
}

export type SiblingMinAggregateOutputType = {
  id: number
  age: number
  orphanId: number
}

export type SiblingMaxAggregateOutputType = {
  id: number
  age: number
  orphanId: number
}


export type SiblingAvgAggregateInputType = {
  id?: true
  age?: true
  orphanId?: true
}

export type SiblingSumAggregateInputType = {
  id?: true
  age?: true
  orphanId?: true
}

export type SiblingMinAggregateInputType = {
  id?: true
  age?: true
  orphanId?: true
}

export type SiblingMaxAggregateInputType = {
  id?: true
  age?: true
  orphanId?: true
}

export type AggregateSiblingArgs = {
  where?: SiblingWhereInput
  orderBy?: Enumerable<SiblingOrderByInput>
  cursor?: SiblingWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SiblingDistinctFieldEnum>
  count?: true
  avg?: SiblingAvgAggregateInputType
  sum?: SiblingSumAggregateInputType
  min?: SiblingMinAggregateInputType
  max?: SiblingMaxAggregateInputType
}

export type GetSiblingAggregateType<T extends AggregateSiblingArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSiblingAggregateScalarType<T[P]>
}

export type GetSiblingAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SiblingAvgAggregateOutputType ? SiblingAvgAggregateOutputType[P] : never
}
    
    

export type SiblingSelect = {
  id?: boolean
  fullName?: boolean
  gender?: boolean
  age?: boolean
  schoolGrade?: boolean
  job?: boolean
  maritalStatus?: boolean
  orphanId?: boolean
  orphan?: boolean | OrphanArgs
}

export type SiblingInclude = {
  orphan?: boolean | OrphanArgs
}

export type SiblingGetPayload<
  S extends boolean | null | undefined | SiblingArgs,
  U = keyof S
> = S extends true
  ? Sibling
  : S extends undefined
  ? never
  : S extends SiblingArgs | FindManySiblingArgs
  ? 'include' extends U
    ? Sibling  & {
      [P in TrueKeys<S['include']>]:
      P extends 'orphan'
      ? OrphanGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Sibling ? Sibling[P]
: 
      P extends 'orphan'
      ? OrphanGetPayload<S['select'][P]> : never
    }
  : Sibling
: Sibling


export interface SiblingDelegate {
  /**
   * Find zero or one Sibling.
   * @param {FindOneSiblingArgs} args - Arguments to find a Sibling
   * @example
   * // Get one Sibling
   * const sibling = await prisma.sibling.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSiblingArgs>(
    args: Subset<T, FindOneSiblingArgs>
  ): CheckSelect<T, Prisma__SiblingClient<Sibling | null>, Prisma__SiblingClient<SiblingGetPayload<T> | null>>
  /**
   * Find zero or more Siblings.
   * @param {FindManySiblingArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Siblings
   * const siblings = await prisma.sibling.findMany()
   * 
   * // Get first 10 Siblings
   * const siblings = await prisma.sibling.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const siblingWithIdOnly = await prisma.sibling.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySiblingArgs>(
    args?: Subset<T, FindManySiblingArgs>
  ): CheckSelect<T, Promise<Array<Sibling>>, Promise<Array<SiblingGetPayload<T>>>>
  /**
   * Create a Sibling.
   * @param {SiblingCreateArgs} args - Arguments to create a Sibling.
   * @example
   * // Create one Sibling
   * const Sibling = await prisma.sibling.create({
   *   data: {
   *     // ... data to create a Sibling
   *   }
   * })
   * 
  **/
  create<T extends SiblingCreateArgs>(
    args: Subset<T, SiblingCreateArgs>
  ): CheckSelect<T, Prisma__SiblingClient<Sibling>, Prisma__SiblingClient<SiblingGetPayload<T>>>
  /**
   * Delete a Sibling.
   * @param {SiblingDeleteArgs} args - Arguments to delete one Sibling.
   * @example
   * // Delete one Sibling
   * const Sibling = await prisma.sibling.delete({
   *   where: {
   *     // ... filter to delete one Sibling
   *   }
   * })
   * 
  **/
  delete<T extends SiblingDeleteArgs>(
    args: Subset<T, SiblingDeleteArgs>
  ): CheckSelect<T, Prisma__SiblingClient<Sibling>, Prisma__SiblingClient<SiblingGetPayload<T>>>
  /**
   * Update one Sibling.
   * @param {SiblingUpdateArgs} args - Arguments to update one Sibling.
   * @example
   * // Update one Sibling
   * const sibling = await prisma.sibling.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SiblingUpdateArgs>(
    args: Subset<T, SiblingUpdateArgs>
  ): CheckSelect<T, Prisma__SiblingClient<Sibling>, Prisma__SiblingClient<SiblingGetPayload<T>>>
  /**
   * Delete zero or more Siblings.
   * @param {SiblingDeleteManyArgs} args - Arguments to filter Siblings to delete.
   * @example
   * // Delete a few Siblings
   * const { count } = await prisma.sibling.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SiblingDeleteManyArgs>(
    args: Subset<T, SiblingDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Siblings.
   * @param {SiblingUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Siblings
   * const sibling = await prisma.sibling.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SiblingUpdateManyArgs>(
    args: Subset<T, SiblingUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Sibling.
   * @param {SiblingUpsertArgs} args - Arguments to update or create a Sibling.
   * @example
   * // Update or create a Sibling
   * const sibling = await prisma.sibling.upsert({
   *   create: {
   *     // ... data to create a Sibling
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Sibling we want to update
   *   }
   * })
  **/
  upsert<T extends SiblingUpsertArgs>(
    args: Subset<T, SiblingUpsertArgs>
  ): CheckSelect<T, Prisma__SiblingClient<Sibling>, Prisma__SiblingClient<SiblingGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySiblingArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSiblingArgs>(args: Subset<T, AggregateSiblingArgs>): Promise<GetSiblingAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Sibling.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SiblingClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  orphan<T extends OrphanArgs = {}>(args?: Subset<T, OrphanArgs>): CheckSelect<T, Prisma__OrphanClient<Orphan | null>, Prisma__OrphanClient<OrphanGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Sibling findOne
 */
export type FindOneSiblingArgs = {
  /**
   * Select specific fields to fetch from the Sibling
  **/
  select?: SiblingSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiblingInclude | null
  /**
   * Filter, which Sibling to fetch.
  **/
  where: SiblingWhereUniqueInput
}


/**
 * Sibling findMany
 */
export type FindManySiblingArgs = {
  /**
   * Select specific fields to fetch from the Sibling
  **/
  select?: SiblingSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiblingInclude | null
  /**
   * Filter, which Siblings to fetch.
  **/
  where?: SiblingWhereInput
  /**
   * Determine the order of the Siblings to fetch.
  **/
  orderBy?: Enumerable<SiblingOrderByInput>
  /**
   * Sets the position for listing Siblings.
  **/
  cursor?: SiblingWhereUniqueInput
  /**
   * The number of Siblings to fetch. If negative number, it will take Siblings before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Siblings.
  **/
  skip?: number
  distinct?: Enumerable<SiblingDistinctFieldEnum>
}


/**
 * Sibling create
 */
export type SiblingCreateArgs = {
  /**
   * Select specific fields to fetch from the Sibling
  **/
  select?: SiblingSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiblingInclude | null
  /**
   * The data needed to create a Sibling.
  **/
  data: SiblingCreateInput
}


/**
 * Sibling update
 */
export type SiblingUpdateArgs = {
  /**
   * Select specific fields to fetch from the Sibling
  **/
  select?: SiblingSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiblingInclude | null
  /**
   * The data needed to update a Sibling.
  **/
  data: SiblingUpdateInput
  /**
   * Choose, which Sibling to update.
  **/
  where: SiblingWhereUniqueInput
}


/**
 * Sibling updateMany
 */
export type SiblingUpdateManyArgs = {
  data: SiblingUpdateManyMutationInput
  where?: SiblingWhereInput
}


/**
 * Sibling upsert
 */
export type SiblingUpsertArgs = {
  /**
   * Select specific fields to fetch from the Sibling
  **/
  select?: SiblingSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiblingInclude | null
  /**
   * The filter to search for the Sibling to update in case it exists.
  **/
  where: SiblingWhereUniqueInput
  /**
   * In case the Sibling found by the `where` argument doesn't exist, create a new Sibling with this data.
  **/
  create: SiblingCreateInput
  /**
   * In case the Sibling was found with the provided `where` argument, update it with this data.
  **/
  update: SiblingUpdateInput
}


/**
 * Sibling delete
 */
export type SiblingDeleteArgs = {
  /**
   * Select specific fields to fetch from the Sibling
  **/
  select?: SiblingSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiblingInclude | null
  /**
   * Filter which Sibling to delete.
  **/
  where: SiblingWhereUniqueInput
}


/**
 * Sibling deleteMany
 */
export type SiblingDeleteManyArgs = {
  where?: SiblingWhereInput
}


/**
 * Sibling without action
 */
export type SiblingArgs = {
  /**
   * Select specific fields to fetch from the Sibling
  **/
  select?: SiblingSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiblingInclude | null
}



/**
 * Model Site
 */

export type Site = {
  id: number
  siteName: string
  donationAmount: number
  addressId: string
}


export type AggregateSite = {
  count: number
  avg: SiteAvgAggregateOutputType | null
  sum: SiteSumAggregateOutputType | null
  min: SiteMinAggregateOutputType | null
  max: SiteMaxAggregateOutputType | null
}

export type SiteAvgAggregateOutputType = {
  id: number
  donationAmount: number
}

export type SiteSumAggregateOutputType = {
  id: number
  donationAmount: number
}

export type SiteMinAggregateOutputType = {
  id: number
  donationAmount: number
}

export type SiteMaxAggregateOutputType = {
  id: number
  donationAmount: number
}


export type SiteAvgAggregateInputType = {
  id?: true
  donationAmount?: true
}

export type SiteSumAggregateInputType = {
  id?: true
  donationAmount?: true
}

export type SiteMinAggregateInputType = {
  id?: true
  donationAmount?: true
}

export type SiteMaxAggregateInputType = {
  id?: true
  donationAmount?: true
}

export type AggregateSiteArgs = {
  where?: SiteWhereInput
  orderBy?: Enumerable<SiteOrderByInput>
  cursor?: SiteWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SiteDistinctFieldEnum>
  count?: true
  avg?: SiteAvgAggregateInputType
  sum?: SiteSumAggregateInputType
  min?: SiteMinAggregateInputType
  max?: SiteMaxAggregateInputType
}

export type GetSiteAggregateType<T extends AggregateSiteArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSiteAggregateScalarType<T[P]>
}

export type GetSiteAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SiteAvgAggregateOutputType ? SiteAvgAggregateOutputType[P] : never
}
    
    

export type SiteSelect = {
  id?: boolean
  siteName?: boolean
  donationAmount?: boolean
  addressId?: boolean
  address?: boolean | AddressArgs
  groupoforphans?: boolean | FindManyGroupOfOrphansArgs
  socialworker?: boolean | FindManySocialWorkerArgs
}

export type SiteInclude = {
  address?: boolean | AddressArgs
  groupoforphans?: boolean | FindManyGroupOfOrphansArgs
  socialworker?: boolean | FindManySocialWorkerArgs
}

export type SiteGetPayload<
  S extends boolean | null | undefined | SiteArgs,
  U = keyof S
> = S extends true
  ? Site
  : S extends undefined
  ? never
  : S extends SiteArgs | FindManySiteArgs
  ? 'include' extends U
    ? Site  & {
      [P in TrueKeys<S['include']>]:
      P extends 'address'
      ? AddressGetPayload<S['include'][P]> :
      P extends 'groupoforphans'
      ? Array<GroupOfOrphansGetPayload<S['include'][P]>> :
      P extends 'socialworker'
      ? Array<SocialWorkerGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Site ? Site[P]
: 
      P extends 'address'
      ? AddressGetPayload<S['select'][P]> :
      P extends 'groupoforphans'
      ? Array<GroupOfOrphansGetPayload<S['select'][P]>> :
      P extends 'socialworker'
      ? Array<SocialWorkerGetPayload<S['select'][P]>> : never
    }
  : Site
: Site


export interface SiteDelegate {
  /**
   * Find zero or one Site.
   * @param {FindOneSiteArgs} args - Arguments to find a Site
   * @example
   * // Get one Site
   * const site = await prisma.site.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSiteArgs>(
    args: Subset<T, FindOneSiteArgs>
  ): CheckSelect<T, Prisma__SiteClient<Site | null>, Prisma__SiteClient<SiteGetPayload<T> | null>>
  /**
   * Find zero or more Sites.
   * @param {FindManySiteArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Sites
   * const sites = await prisma.site.findMany()
   * 
   * // Get first 10 Sites
   * const sites = await prisma.site.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const siteWithIdOnly = await prisma.site.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySiteArgs>(
    args?: Subset<T, FindManySiteArgs>
  ): CheckSelect<T, Promise<Array<Site>>, Promise<Array<SiteGetPayload<T>>>>
  /**
   * Create a Site.
   * @param {SiteCreateArgs} args - Arguments to create a Site.
   * @example
   * // Create one Site
   * const Site = await prisma.site.create({
   *   data: {
   *     // ... data to create a Site
   *   }
   * })
   * 
  **/
  create<T extends SiteCreateArgs>(
    args: Subset<T, SiteCreateArgs>
  ): CheckSelect<T, Prisma__SiteClient<Site>, Prisma__SiteClient<SiteGetPayload<T>>>
  /**
   * Delete a Site.
   * @param {SiteDeleteArgs} args - Arguments to delete one Site.
   * @example
   * // Delete one Site
   * const Site = await prisma.site.delete({
   *   where: {
   *     // ... filter to delete one Site
   *   }
   * })
   * 
  **/
  delete<T extends SiteDeleteArgs>(
    args: Subset<T, SiteDeleteArgs>
  ): CheckSelect<T, Prisma__SiteClient<Site>, Prisma__SiteClient<SiteGetPayload<T>>>
  /**
   * Update one Site.
   * @param {SiteUpdateArgs} args - Arguments to update one Site.
   * @example
   * // Update one Site
   * const site = await prisma.site.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SiteUpdateArgs>(
    args: Subset<T, SiteUpdateArgs>
  ): CheckSelect<T, Prisma__SiteClient<Site>, Prisma__SiteClient<SiteGetPayload<T>>>
  /**
   * Delete zero or more Sites.
   * @param {SiteDeleteManyArgs} args - Arguments to filter Sites to delete.
   * @example
   * // Delete a few Sites
   * const { count } = await prisma.site.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SiteDeleteManyArgs>(
    args: Subset<T, SiteDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Sites.
   * @param {SiteUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Sites
   * const site = await prisma.site.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SiteUpdateManyArgs>(
    args: Subset<T, SiteUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Site.
   * @param {SiteUpsertArgs} args - Arguments to update or create a Site.
   * @example
   * // Update or create a Site
   * const site = await prisma.site.upsert({
   *   create: {
   *     // ... data to create a Site
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Site we want to update
   *   }
   * })
  **/
  upsert<T extends SiteUpsertArgs>(
    args: Subset<T, SiteUpsertArgs>
  ): CheckSelect<T, Prisma__SiteClient<Site>, Prisma__SiteClient<SiteGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySiteArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSiteArgs>(args: Subset<T, AggregateSiteArgs>): Promise<GetSiteAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Site.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SiteClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  address<T extends AddressArgs = {}>(args?: Subset<T, AddressArgs>): CheckSelect<T, Prisma__AddressClient<Address | null>, Prisma__AddressClient<AddressGetPayload<T> | null>>;

  groupoforphans<T extends FindManyGroupOfOrphansArgs = {}>(args?: Subset<T, FindManyGroupOfOrphansArgs>): CheckSelect<T, Promise<Array<GroupOfOrphans>>, Promise<Array<GroupOfOrphansGetPayload<T>>>>;

  socialworker<T extends FindManySocialWorkerArgs = {}>(args?: Subset<T, FindManySocialWorkerArgs>): CheckSelect<T, Promise<Array<SocialWorker>>, Promise<Array<SocialWorkerGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Site findOne
 */
export type FindOneSiteArgs = {
  /**
   * Select specific fields to fetch from the Site
  **/
  select?: SiteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiteInclude | null
  /**
   * Filter, which Site to fetch.
  **/
  where: SiteWhereUniqueInput
}


/**
 * Site findMany
 */
export type FindManySiteArgs = {
  /**
   * Select specific fields to fetch from the Site
  **/
  select?: SiteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiteInclude | null
  /**
   * Filter, which Sites to fetch.
  **/
  where?: SiteWhereInput
  /**
   * Determine the order of the Sites to fetch.
  **/
  orderBy?: Enumerable<SiteOrderByInput>
  /**
   * Sets the position for listing Sites.
  **/
  cursor?: SiteWhereUniqueInput
  /**
   * The number of Sites to fetch. If negative number, it will take Sites before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Sites.
  **/
  skip?: number
  distinct?: Enumerable<SiteDistinctFieldEnum>
}


/**
 * Site create
 */
export type SiteCreateArgs = {
  /**
   * Select specific fields to fetch from the Site
  **/
  select?: SiteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiteInclude | null
  /**
   * The data needed to create a Site.
  **/
  data: SiteCreateInput
}


/**
 * Site update
 */
export type SiteUpdateArgs = {
  /**
   * Select specific fields to fetch from the Site
  **/
  select?: SiteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiteInclude | null
  /**
   * The data needed to update a Site.
  **/
  data: SiteUpdateInput
  /**
   * Choose, which Site to update.
  **/
  where: SiteWhereUniqueInput
}


/**
 * Site updateMany
 */
export type SiteUpdateManyArgs = {
  data: SiteUpdateManyMutationInput
  where?: SiteWhereInput
}


/**
 * Site upsert
 */
export type SiteUpsertArgs = {
  /**
   * Select specific fields to fetch from the Site
  **/
  select?: SiteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiteInclude | null
  /**
   * The filter to search for the Site to update in case it exists.
  **/
  where: SiteWhereUniqueInput
  /**
   * In case the Site found by the `where` argument doesn't exist, create a new Site with this data.
  **/
  create: SiteCreateInput
  /**
   * In case the Site was found with the provided `where` argument, update it with this data.
  **/
  update: SiteUpdateInput
}


/**
 * Site delete
 */
export type SiteDeleteArgs = {
  /**
   * Select specific fields to fetch from the Site
  **/
  select?: SiteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiteInclude | null
  /**
   * Filter which Site to delete.
  **/
  where: SiteWhereUniqueInput
}


/**
 * Site deleteMany
 */
export type SiteDeleteManyArgs = {
  where?: SiteWhereInput
}


/**
 * Site without action
 */
export type SiteArgs = {
  /**
   * Select specific fields to fetch from the Site
  **/
  select?: SiteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SiteInclude | null
}



/**
 * Model SocialWorker
 */

export type SocialWorker = {
  id: number
  fullName: string
  phoneNumber: number
  email: string
  siteId: number
}


export type AggregateSocialWorker = {
  count: number
  avg: SocialWorkerAvgAggregateOutputType | null
  sum: SocialWorkerSumAggregateOutputType | null
  min: SocialWorkerMinAggregateOutputType | null
  max: SocialWorkerMaxAggregateOutputType | null
}

export type SocialWorkerAvgAggregateOutputType = {
  id: number
  phoneNumber: number
  siteId: number
}

export type SocialWorkerSumAggregateOutputType = {
  id: number
  phoneNumber: number
  siteId: number
}

export type SocialWorkerMinAggregateOutputType = {
  id: number
  phoneNumber: number
  siteId: number
}

export type SocialWorkerMaxAggregateOutputType = {
  id: number
  phoneNumber: number
  siteId: number
}


export type SocialWorkerAvgAggregateInputType = {
  id?: true
  phoneNumber?: true
  siteId?: true
}

export type SocialWorkerSumAggregateInputType = {
  id?: true
  phoneNumber?: true
  siteId?: true
}

export type SocialWorkerMinAggregateInputType = {
  id?: true
  phoneNumber?: true
  siteId?: true
}

export type SocialWorkerMaxAggregateInputType = {
  id?: true
  phoneNumber?: true
  siteId?: true
}

export type AggregateSocialWorkerArgs = {
  where?: SocialWorkerWhereInput
  orderBy?: Enumerable<SocialWorkerOrderByInput>
  cursor?: SocialWorkerWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SocialWorkerDistinctFieldEnum>
  count?: true
  avg?: SocialWorkerAvgAggregateInputType
  sum?: SocialWorkerSumAggregateInputType
  min?: SocialWorkerMinAggregateInputType
  max?: SocialWorkerMaxAggregateInputType
}

export type GetSocialWorkerAggregateType<T extends AggregateSocialWorkerArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSocialWorkerAggregateScalarType<T[P]>
}

export type GetSocialWorkerAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SocialWorkerAvgAggregateOutputType ? SocialWorkerAvgAggregateOutputType[P] : never
}
    
    

export type SocialWorkerSelect = {
  id?: boolean
  fullName?: boolean
  phoneNumber?: boolean
  email?: boolean
  siteId?: boolean
  site?: boolean | SiteArgs
  groupoforphans?: boolean | FindManyGroupOfOrphansArgs
}

export type SocialWorkerInclude = {
  site?: boolean | SiteArgs
  groupoforphans?: boolean | FindManyGroupOfOrphansArgs
}

export type SocialWorkerGetPayload<
  S extends boolean | null | undefined | SocialWorkerArgs,
  U = keyof S
> = S extends true
  ? SocialWorker
  : S extends undefined
  ? never
  : S extends SocialWorkerArgs | FindManySocialWorkerArgs
  ? 'include' extends U
    ? SocialWorker  & {
      [P in TrueKeys<S['include']>]:
      P extends 'site'
      ? SiteGetPayload<S['include'][P]> :
      P extends 'groupoforphans'
      ? Array<GroupOfOrphansGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof SocialWorker ? SocialWorker[P]
: 
      P extends 'site'
      ? SiteGetPayload<S['select'][P]> :
      P extends 'groupoforphans'
      ? Array<GroupOfOrphansGetPayload<S['select'][P]>> : never
    }
  : SocialWorker
: SocialWorker


export interface SocialWorkerDelegate {
  /**
   * Find zero or one SocialWorker.
   * @param {FindOneSocialWorkerArgs} args - Arguments to find a SocialWorker
   * @example
   * // Get one SocialWorker
   * const socialWorker = await prisma.socialWorker.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSocialWorkerArgs>(
    args: Subset<T, FindOneSocialWorkerArgs>
  ): CheckSelect<T, Prisma__SocialWorkerClient<SocialWorker | null>, Prisma__SocialWorkerClient<SocialWorkerGetPayload<T> | null>>
  /**
   * Find zero or more SocialWorkers.
   * @param {FindManySocialWorkerArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all SocialWorkers
   * const socialWorkers = await prisma.socialWorker.findMany()
   * 
   * // Get first 10 SocialWorkers
   * const socialWorkers = await prisma.socialWorker.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const socialWorkerWithIdOnly = await prisma.socialWorker.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySocialWorkerArgs>(
    args?: Subset<T, FindManySocialWorkerArgs>
  ): CheckSelect<T, Promise<Array<SocialWorker>>, Promise<Array<SocialWorkerGetPayload<T>>>>
  /**
   * Create a SocialWorker.
   * @param {SocialWorkerCreateArgs} args - Arguments to create a SocialWorker.
   * @example
   * // Create one SocialWorker
   * const SocialWorker = await prisma.socialWorker.create({
   *   data: {
   *     // ... data to create a SocialWorker
   *   }
   * })
   * 
  **/
  create<T extends SocialWorkerCreateArgs>(
    args: Subset<T, SocialWorkerCreateArgs>
  ): CheckSelect<T, Prisma__SocialWorkerClient<SocialWorker>, Prisma__SocialWorkerClient<SocialWorkerGetPayload<T>>>
  /**
   * Delete a SocialWorker.
   * @param {SocialWorkerDeleteArgs} args - Arguments to delete one SocialWorker.
   * @example
   * // Delete one SocialWorker
   * const SocialWorker = await prisma.socialWorker.delete({
   *   where: {
   *     // ... filter to delete one SocialWorker
   *   }
   * })
   * 
  **/
  delete<T extends SocialWorkerDeleteArgs>(
    args: Subset<T, SocialWorkerDeleteArgs>
  ): CheckSelect<T, Prisma__SocialWorkerClient<SocialWorker>, Prisma__SocialWorkerClient<SocialWorkerGetPayload<T>>>
  /**
   * Update one SocialWorker.
   * @param {SocialWorkerUpdateArgs} args - Arguments to update one SocialWorker.
   * @example
   * // Update one SocialWorker
   * const socialWorker = await prisma.socialWorker.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SocialWorkerUpdateArgs>(
    args: Subset<T, SocialWorkerUpdateArgs>
  ): CheckSelect<T, Prisma__SocialWorkerClient<SocialWorker>, Prisma__SocialWorkerClient<SocialWorkerGetPayload<T>>>
  /**
   * Delete zero or more SocialWorkers.
   * @param {SocialWorkerDeleteManyArgs} args - Arguments to filter SocialWorkers to delete.
   * @example
   * // Delete a few SocialWorkers
   * const { count } = await prisma.socialWorker.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SocialWorkerDeleteManyArgs>(
    args: Subset<T, SocialWorkerDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more SocialWorkers.
   * @param {SocialWorkerUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many SocialWorkers
   * const socialWorker = await prisma.socialWorker.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SocialWorkerUpdateManyArgs>(
    args: Subset<T, SocialWorkerUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one SocialWorker.
   * @param {SocialWorkerUpsertArgs} args - Arguments to update or create a SocialWorker.
   * @example
   * // Update or create a SocialWorker
   * const socialWorker = await prisma.socialWorker.upsert({
   *   create: {
   *     // ... data to create a SocialWorker
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the SocialWorker we want to update
   *   }
   * })
  **/
  upsert<T extends SocialWorkerUpsertArgs>(
    args: Subset<T, SocialWorkerUpsertArgs>
  ): CheckSelect<T, Prisma__SocialWorkerClient<SocialWorker>, Prisma__SocialWorkerClient<SocialWorkerGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySocialWorkerArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSocialWorkerArgs>(args: Subset<T, AggregateSocialWorkerArgs>): Promise<GetSocialWorkerAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for SocialWorker.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SocialWorkerClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  site<T extends SiteArgs = {}>(args?: Subset<T, SiteArgs>): CheckSelect<T, Prisma__SiteClient<Site | null>, Prisma__SiteClient<SiteGetPayload<T> | null>>;

  groupoforphans<T extends FindManyGroupOfOrphansArgs = {}>(args?: Subset<T, FindManyGroupOfOrphansArgs>): CheckSelect<T, Promise<Array<GroupOfOrphans>>, Promise<Array<GroupOfOrphansGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * SocialWorker findOne
 */
export type FindOneSocialWorkerArgs = {
  /**
   * Select specific fields to fetch from the SocialWorker
  **/
  select?: SocialWorkerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SocialWorkerInclude | null
  /**
   * Filter, which SocialWorker to fetch.
  **/
  where: SocialWorkerWhereUniqueInput
}


/**
 * SocialWorker findMany
 */
export type FindManySocialWorkerArgs = {
  /**
   * Select specific fields to fetch from the SocialWorker
  **/
  select?: SocialWorkerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SocialWorkerInclude | null
  /**
   * Filter, which SocialWorkers to fetch.
  **/
  where?: SocialWorkerWhereInput
  /**
   * Determine the order of the SocialWorkers to fetch.
  **/
  orderBy?: Enumerable<SocialWorkerOrderByInput>
  /**
   * Sets the position for listing SocialWorkers.
  **/
  cursor?: SocialWorkerWhereUniqueInput
  /**
   * The number of SocialWorkers to fetch. If negative number, it will take SocialWorkers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` SocialWorkers.
  **/
  skip?: number
  distinct?: Enumerable<SocialWorkerDistinctFieldEnum>
}


/**
 * SocialWorker create
 */
export type SocialWorkerCreateArgs = {
  /**
   * Select specific fields to fetch from the SocialWorker
  **/
  select?: SocialWorkerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SocialWorkerInclude | null
  /**
   * The data needed to create a SocialWorker.
  **/
  data: SocialWorkerCreateInput
}


/**
 * SocialWorker update
 */
export type SocialWorkerUpdateArgs = {
  /**
   * Select specific fields to fetch from the SocialWorker
  **/
  select?: SocialWorkerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SocialWorkerInclude | null
  /**
   * The data needed to update a SocialWorker.
  **/
  data: SocialWorkerUpdateInput
  /**
   * Choose, which SocialWorker to update.
  **/
  where: SocialWorkerWhereUniqueInput
}


/**
 * SocialWorker updateMany
 */
export type SocialWorkerUpdateManyArgs = {
  data: SocialWorkerUpdateManyMutationInput
  where?: SocialWorkerWhereInput
}


/**
 * SocialWorker upsert
 */
export type SocialWorkerUpsertArgs = {
  /**
   * Select specific fields to fetch from the SocialWorker
  **/
  select?: SocialWorkerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SocialWorkerInclude | null
  /**
   * The filter to search for the SocialWorker to update in case it exists.
  **/
  where: SocialWorkerWhereUniqueInput
  /**
   * In case the SocialWorker found by the `where` argument doesn't exist, create a new SocialWorker with this data.
  **/
  create: SocialWorkerCreateInput
  /**
   * In case the SocialWorker was found with the provided `where` argument, update it with this data.
  **/
  update: SocialWorkerUpdateInput
}


/**
 * SocialWorker delete
 */
export type SocialWorkerDeleteArgs = {
  /**
   * Select specific fields to fetch from the SocialWorker
  **/
  select?: SocialWorkerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SocialWorkerInclude | null
  /**
   * Filter which SocialWorker to delete.
  **/
  where: SocialWorkerWhereUniqueInput
}


/**
 * SocialWorker deleteMany
 */
export type SocialWorkerDeleteManyArgs = {
  where?: SocialWorkerWhereInput
}


/**
 * SocialWorker without action
 */
export type SocialWorkerArgs = {
  /**
   * Select specific fields to fetch from the SocialWorker
  **/
  select?: SocialWorkerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SocialWorkerInclude | null
}



/**
 * Deep Input Types
 */


export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter | null
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter | null
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type AddressRelationFilter = {
  is?: AddressWhereInput | null
  isNot?: AddressWhereInput | null
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: NestedDateTimeFilter | null
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
  not?: NestedStringNullableFilter | null
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
  not?: string | NestedStringNullableFilter | null
}

export type NestedFloatNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
  not?: NestedFloatNullableFilter | null
}

export type FloatNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
  not?: number | NestedFloatNullableFilter | null
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
  not?: NestedDateTimeNullableFilter | null
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type DonorWhereInput = {
  AND?: Enumerable<DonorWhereInput>
  OR?: Array<DonorWhereInput>
  NOT?: Enumerable<DonorWhereInput>
  id?: number | IntFilter
  companyName?: string | StringFilter
  typeOfsupport?: string | StringNullableFilter | null
  initialDonationAmount?: number | FloatNullableFilter | null
  initialReportPreparationDate?: Date | string | DateTimeNullableFilter | null
  finalReportPreparationDate?: Date | string | DateTimeNullableFilter | null
  initialDataCollectionDate?: Date | string | DateTimeNullableFilter | null
  finalDataCollectionDate?: Date | string | DateTimeNullableFilter | null
  reportDueDate?: Date | string | DateTimeNullableFilter | null
  groupsOfOrphans?: GroupOfOrphansListRelationFilter
}

export type DonorRelationFilter = {
  is?: DonorWhereInput | null
  isNot?: DonorWhereInput | null
}

export type SocialWorkerWhereInput = {
  AND?: Enumerable<SocialWorkerWhereInput>
  OR?: Array<SocialWorkerWhereInput>
  NOT?: Enumerable<SocialWorkerWhereInput>
  id?: number | IntFilter
  fullName?: string | StringFilter
  phoneNumber?: number | IntFilter
  email?: string | StringFilter
  siteId?: number | IntFilter
  site?: SiteWhereInput | null
  groupoforphans?: GroupOfOrphansListRelationFilter
}

export type SocialWorkerRelationFilter = {
  is?: SocialWorkerWhereInput | null
  isNot?: SocialWorkerWhereInput | null
}

export type NestedEnumorphanGenderFilter = {
  equals?: orphanGender
  in?: Enumerable<orphanGender>
  notIn?: Enumerable<orphanGender>
  not?: NestedEnumorphanGenderFilter | null
}

export type EnumorphanGenderFilter = {
  equals?: orphanGender
  in?: Enumerable<orphanGender>
  notIn?: Enumerable<orphanGender>
  not?: orphanGender | NestedEnumorphanGenderFilter
}

export type OrphanRelationFilter = {
  is?: OrphanWhereInput | null
  isNot?: OrphanWhereInput | null
}

export type SiblingWhereInput = {
  AND?: Enumerable<SiblingWhereInput>
  OR?: Array<SiblingWhereInput>
  NOT?: Enumerable<SiblingWhereInput>
  id?: number | IntFilter
  fullName?: string | StringFilter
  gender?: string | StringFilter
  age?: number | IntFilter
  schoolGrade?: string | StringNullableFilter | null
  job?: string | StringNullableFilter | null
  maritalStatus?: string | StringFilter
  orphanId?: number | IntFilter
  orphan?: OrphanWhereInput | null
}

export type SiblingListRelationFilter = {
  every?: SiblingWhereInput
  some?: SiblingWhereInput
  none?: SiblingWhereInput
}

export type Iga_propertyWhereInput = {
  AND?: Enumerable<Iga_propertyWhereInput>
  OR?: Array<Iga_propertyWhereInput>
  NOT?: Enumerable<Iga_propertyWhereInput>
  id?: number | IntFilter
  ownershipStatus?: string | StringFilter
  otherProperty?: string | StringNullableFilter | null
  orphans?: OrphanListRelationFilter
}

export type Iga_propertyRelationFilter = {
  is?: Iga_propertyWhereInput | null
  isNot?: Iga_propertyWhereInput | null
}

export type NestedEnumeducationEnrollmentStatusFilter = {
  equals?: educationEnrollmentStatus
  in?: Enumerable<educationEnrollmentStatus>
  notIn?: Enumerable<educationEnrollmentStatus>
  not?: NestedEnumeducationEnrollmentStatusFilter | null
}

export type EnumeducationEnrollmentStatusFilter = {
  equals?: educationEnrollmentStatus
  in?: Enumerable<educationEnrollmentStatus>
  notIn?: Enumerable<educationEnrollmentStatus>
  not?: educationEnrollmentStatus | NestedEnumeducationEnrollmentStatusFilter
}

export type NestedEnumeducationTypeOfSchoolNullableFilter = {
  equals?: educationTypeOfSchool | null
  in?: Enumerable<educationTypeOfSchool> | null
  notIn?: Enumerable<educationTypeOfSchool> | null
  not?: NestedEnumeducationTypeOfSchoolNullableFilter | null
}

export type EnumeducationTypeOfSchoolNullableFilter = {
  equals?: educationTypeOfSchool | null
  in?: Enumerable<educationTypeOfSchool> | null
  notIn?: Enumerable<educationTypeOfSchool> | null
  not?: educationTypeOfSchool | NestedEnumeducationTypeOfSchoolNullableFilter | null
}

export type EducationWhereInput = {
  AND?: Enumerable<EducationWhereInput>
  OR?: Array<EducationWhereInput>
  NOT?: Enumerable<EducationWhereInput>
  id?: number | IntFilter
  enrollmentStatus?: educationEnrollmentStatus | EnumeducationEnrollmentStatusFilter
  schoolName?: string | StringNullableFilter | null
  typeOfSchool?: educationTypeOfSchool | EnumeducationTypeOfSchoolNullableFilter | null
  grade?: string | StringNullableFilter | null
  reason?: string | StringNullableFilter | null
  hobbies?: string | StringNullableFilter | null
  orphans?: OrphanListRelationFilter
}

export type EducationRelationFilter = {
  is?: EducationWhereInput | null
  isNot?: EducationWhereInput | null
}

export type FatherWhereInput = {
  AND?: Enumerable<FatherWhereInput>
  OR?: Array<FatherWhereInput>
  NOT?: Enumerable<FatherWhereInput>
  id?: number | IntFilter
  dateOfDeath?: Date | string | DateTimeFilter
  causeOfDeath?: string | StringFilter
  job?: string | StringNullableFilter | null
  monthlyIncome?: number | IntFilter
  dateOfBirth?: Date | string | DateTimeFilter
  orphans?: OrphanListRelationFilter
}

export type FatherRelationFilter = {
  is?: FatherWhereInput | null
  isNot?: FatherWhereInput | null
}

export type GroupOfOrphansRelationFilter = {
  is?: GroupOfOrphansWhereInput | null
  isNot?: GroupOfOrphansWhereInput | null
}

export type GuardianWhereInput = {
  AND?: Enumerable<GuardianWhereInput>
  OR?: Array<GuardianWhereInput>
  NOT?: Enumerable<GuardianWhereInput>
  id?: number | IntFilter
  firstName?: string | StringFilter
  middleName?: string | StringFilter
  lastName?: string | StringFilter
  gender?: string | StringFilter
  nationality?: string | StringFilter
  state?: string | StringFilter
  zone?: string | StringFilter
  district?: string | StringFilter
  kebele?: string | StringFilter
  relationToOrphan?: string | StringFilter
  email?: string | StringFilter
  job?: string | StringNullableFilter | null
  age?: number | IntFilter
  orphans?: OrphanListRelationFilter
}

export type GuardianRelationFilter = {
  is?: GuardianWhereInput | null
  isNot?: GuardianWhereInput | null
}

export type NestedFloatFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedFloatFilter | null
}

export type FloatFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatFilter
}

export type MotherJobWhereInput = {
  AND?: Enumerable<MotherJobWhereInput>
  OR?: Array<MotherJobWhereInput>
  NOT?: Enumerable<MotherJobWhereInput>
  id?: number | IntFilter
  currentJobTitle?: string | StringNullableFilter | null
  monthlyIncome?: number | FloatNullableFilter | null
  mother?: MotherWhereInput | null
}

export type MotherJobRelationFilter = {
  is?: MotherJobWhereInput | null
  isNot?: MotherJobWhereInput | null
}

export type MotherWhereInput = {
  AND?: Enumerable<MotherWhereInput>
  OR?: Array<MotherWhereInput>
  NOT?: Enumerable<MotherWhereInput>
  id?: number | IntFilter
  firstName?: string | StringFilter
  middleName?: string | StringFilter
  lastName?: string | StringFilter
  dateOfBirth?: Date | string | DateTimeFilter
  phoneNumber?: number | IntFilter
  job?: number | IntFilter
  maritalStatus?: string | StringFilter
  vitalStatus?: string | StringFilter
  monthlyExpense?: number | FloatFilter
  motherjob?: MotherJobWhereInput | null
  orphans?: OrphanListRelationFilter
}

export type MotherRelationFilter = {
  is?: MotherWhereInput | null
  isNot?: MotherWhereInput | null
}

export type OrphanWhereInput = {
  AND?: Enumerable<OrphanWhereInput>
  OR?: Array<OrphanWhereInput>
  NOT?: Enumerable<OrphanWhereInput>
  id?: number | IntFilter
  firstName?: string | StringFilter
  fatherName?: string | StringFilter
  grandFatherName?: string | StringFilter
  greatGrandFatherName?: string | StringFilter
  gender?: orphanGender | EnumorphanGenderFilter
  placeOfBirth?: string | StringFilter
  dateOfBirth?: Date | string | DateTimeFilter
  numberOfSponserdSiblings?: number | IntFilter
  physicalHealthStatus?: string | StringFilter
  psychologicalHealthStatus?: string | StringFilter
  otherHealthIssues?: string | StringNullableFilter | null
  photoPortraitUrl?: string | StringFilter
  photoLongUrl?: string | StringFilter
  fatherId?: number | IntFilter
  motherId?: number | IntFilter
  guardianId?: number | IntFilter
  groupId?: number | IntFilter
  siblingId?: number | IntFilter
  IGA_PropertyId?: number | IntFilter
  educationId?: number | IntFilter
  siblings?: SiblingListRelationFilter
  iga_property?: Iga_propertyWhereInput | null
  education?: EducationWhereInput | null
  father?: FatherWhereInput | null
  groupoforphans?: GroupOfOrphansWhereInput | null
  guardian?: GuardianWhereInput | null
  mother?: MotherWhereInput | null
}

export type OrphanListRelationFilter = {
  every?: OrphanWhereInput
  some?: OrphanWhereInput
  none?: OrphanWhereInput
}

export type GroupOfOrphansWhereInput = {
  AND?: Enumerable<GroupOfOrphansWhereInput>
  OR?: Array<GroupOfOrphansWhereInput>
  NOT?: Enumerable<GroupOfOrphansWhereInput>
  id?: number | IntFilter
  registrationDate?: Date | string | DateTimeFilter
  donorId?: number | IntFilter
  socialWorkerId?: number | IntFilter
  siteId?: number | IntFilter
  donor?: DonorWhereInput | null
  site?: SiteWhereInput | null
  socialworker?: SocialWorkerWhereInput | null
  orphans?: OrphanListRelationFilter
}

export type GroupOfOrphansListRelationFilter = {
  every?: GroupOfOrphansWhereInput
  some?: GroupOfOrphansWhereInput
  none?: GroupOfOrphansWhereInput
}

export type SocialWorkerListRelationFilter = {
  every?: SocialWorkerWhereInput
  some?: SocialWorkerWhereInput
  none?: SocialWorkerWhereInput
}

export type SiteWhereInput = {
  AND?: Enumerable<SiteWhereInput>
  OR?: Array<SiteWhereInput>
  NOT?: Enumerable<SiteWhereInput>
  id?: number | IntFilter
  siteName?: string | StringFilter
  donationAmount?: number | IntFilter
  addressId?: string | StringFilter
  address?: AddressWhereInput | null
  groupoforphans?: GroupOfOrphansListRelationFilter
  socialworker?: SocialWorkerListRelationFilter
}

export type SiteRelationFilter = {
  is?: SiteWhereInput | null
  isNot?: SiteWhereInput | null
}

export type AddressWhereInput = {
  AND?: Enumerable<AddressWhereInput>
  OR?: Array<AddressWhereInput>
  NOT?: Enumerable<AddressWhereInput>
  state?: string | StringFilter
  zone?: string | StringFilter
  district?: string | StringFilter
  kebele?: string | StringFilter
  site?: SiteWhereInput | null
}

export type AddressOrderByInput = {
  state?: SortOrder
  zone?: SortOrder
  district?: SortOrder
  kebele?: SortOrder
}

export type AddressWhereUniqueInput = {
  state?: string
}

export type GroupOfOrphansOrderByInput = {
  id?: SortOrder
  registrationDate?: SortOrder
  donorId?: SortOrder
  socialWorkerId?: SortOrder
  siteId?: SortOrder
}

export type GroupOfOrphansWhereUniqueInput = {
  id?: number
  donorId?: number
  socialWorkerId?: number
  siteId?: number
}

export type OrphanOrderByInput = {
  id?: SortOrder
  firstName?: SortOrder
  fatherName?: SortOrder
  grandFatherName?: SortOrder
  greatGrandFatherName?: SortOrder
  gender?: SortOrder
  placeOfBirth?: SortOrder
  dateOfBirth?: SortOrder
  numberOfSponserdSiblings?: SortOrder
  physicalHealthStatus?: SortOrder
  psychologicalHealthStatus?: SortOrder
  otherHealthIssues?: SortOrder
  photoPortraitUrl?: SortOrder
  photoLongUrl?: SortOrder
  fatherId?: SortOrder
  motherId?: SortOrder
  guardianId?: SortOrder
  groupId?: SortOrder
  siblingId?: SortOrder
  IGA_PropertyId?: SortOrder
  educationId?: SortOrder
}

export type OrphanWhereUniqueInput = {
  id?: number
  fatherId?: number
  motherId?: number
  guardianId?: number
  groupId?: number
  IGA_PropertyId?: number
  educationId?: number
}

export type SiblingOrderByInput = {
  id?: SortOrder
  fullName?: SortOrder
  gender?: SortOrder
  age?: SortOrder
  schoolGrade?: SortOrder
  job?: SortOrder
  maritalStatus?: SortOrder
  orphanId?: SortOrder
}

export type SiblingWhereUniqueInput = {
  id?: number
  orphanId?: number
}

export type SocialWorkerOrderByInput = {
  id?: SortOrder
  fullName?: SortOrder
  phoneNumber?: SortOrder
  email?: SortOrder
  siteId?: SortOrder
}

export type SocialWorkerWhereUniqueInput = {
  id?: number
  siteId?: number
}

export type DonorOrderByInput = {
  id?: SortOrder
  companyName?: SortOrder
  typeOfsupport?: SortOrder
  initialDonationAmount?: SortOrder
  initialReportPreparationDate?: SortOrder
  finalReportPreparationDate?: SortOrder
  initialDataCollectionDate?: SortOrder
  finalDataCollectionDate?: SortOrder
  reportDueDate?: SortOrder
}

export type DonorWhereUniqueInput = {
  id?: number
}

export type EducationOrderByInput = {
  id?: SortOrder
  enrollmentStatus?: SortOrder
  schoolName?: SortOrder
  typeOfSchool?: SortOrder
  grade?: SortOrder
  reason?: SortOrder
  hobbies?: SortOrder
}

export type EducationWhereUniqueInput = {
  id?: number
}

export type FatherOrderByInput = {
  id?: SortOrder
  dateOfDeath?: SortOrder
  causeOfDeath?: SortOrder
  job?: SortOrder
  monthlyIncome?: SortOrder
  dateOfBirth?: SortOrder
}

export type FatherWhereUniqueInput = {
  id?: number
}

export type GuardianOrderByInput = {
  id?: SortOrder
  firstName?: SortOrder
  middleName?: SortOrder
  lastName?: SortOrder
  gender?: SortOrder
  nationality?: SortOrder
  state?: SortOrder
  zone?: SortOrder
  district?: SortOrder
  kebele?: SortOrder
  relationToOrphan?: SortOrder
  email?: SortOrder
  job?: SortOrder
  age?: SortOrder
}

export type GuardianWhereUniqueInput = {
  id?: number
}

export type Iga_propertyOrderByInput = {
  id?: SortOrder
  ownershipStatus?: SortOrder
  otherProperty?: SortOrder
}

export type Iga_propertyWhereUniqueInput = {
  id?: number
}

export type MotherOrderByInput = {
  id?: SortOrder
  firstName?: SortOrder
  middleName?: SortOrder
  lastName?: SortOrder
  dateOfBirth?: SortOrder
  phoneNumber?: SortOrder
  job?: SortOrder
  maritalStatus?: SortOrder
  vitalStatus?: SortOrder
  monthlyExpense?: SortOrder
}

export type MotherWhereUniqueInput = {
  id?: number
  job?: number
}

export type MotherJobOrderByInput = {
  id?: SortOrder
  currentJobTitle?: SortOrder
  monthlyIncome?: SortOrder
}

export type MotherJobWhereUniqueInput = {
  id?: number
}

export type SiteOrderByInput = {
  id?: SortOrder
  siteName?: SortOrder
  donationAmount?: SortOrder
  addressId?: SortOrder
}

export type SiteWhereUniqueInput = {
  id?: number
  addressId?: string
}

export type DonorCreateWithoutGroupsOfOrphansInput = {
  companyName: string
  typeOfsupport?: string | null
  initialDonationAmount?: number | null
  initialReportPreparationDate?: Date | string | null
  finalReportPreparationDate?: Date | string | null
  initialDataCollectionDate?: Date | string | null
  finalDataCollectionDate?: Date | string | null
  reportDueDate?: Date | string | null
}

export type DonorCreateOneWithoutGroupsOfOrphansInput = {
  create?: DonorCreateWithoutGroupsOfOrphansInput
  connect?: DonorWhereUniqueInput
}

export type AddressCreateWithoutSiteInput = {
  state: string
  zone: string
  district: string
  kebele: string
}

export type AddressCreateOneWithoutSiteInput = {
  create?: AddressCreateWithoutSiteInput
  connect?: AddressWhereUniqueInput
}

export type SiteCreateWithoutSocialworkerInput = {
  siteName: string
  donationAmount: number
  address: AddressCreateOneWithoutSiteInput
  groupoforphans?: GroupOfOrphansCreateManyWithoutSiteInput
}

export type SiteCreateOneWithoutSocialworkerInput = {
  create?: SiteCreateWithoutSocialworkerInput
  connect?: SiteWhereUniqueInput
}

export type SocialWorkerCreateWithoutGroupoforphansInput = {
  fullName: string
  phoneNumber: number
  email: string
  site: SiteCreateOneWithoutSocialworkerInput
}

export type SocialWorkerCreateOneWithoutGroupoforphansInput = {
  create?: SocialWorkerCreateWithoutGroupoforphansInput
  connect?: SocialWorkerWhereUniqueInput
}

export type SiblingCreateWithoutOrphanInput = {
  fullName: string
  gender: string
  age: number
  schoolGrade?: string | null
  job?: string | null
  maritalStatus: string
}

export type SiblingCreateManyWithoutOrphanInput = {
  create?: Enumerable<SiblingCreateWithoutOrphanInput>
  connect?: Enumerable<SiblingWhereUniqueInput>
}

export type Iga_propertyCreateWithoutOrphansInput = {
  ownershipStatus: string
  otherProperty?: string | null
}

export type Iga_propertyCreateOneWithoutOrphansInput = {
  create?: Iga_propertyCreateWithoutOrphansInput
  connect?: Iga_propertyWhereUniqueInput
}

export type EducationCreateWithoutOrphansInput = {
  enrollmentStatus: educationEnrollmentStatus
  schoolName?: string | null
  typeOfSchool?: educationTypeOfSchool | null
  grade?: string | null
  reason?: string | null
  hobbies?: string | null
}

export type EducationCreateOneWithoutOrphansInput = {
  create?: EducationCreateWithoutOrphansInput
  connect?: EducationWhereUniqueInput
}

export type FatherCreateWithoutOrphansInput = {
  dateOfDeath: Date | string
  causeOfDeath: string
  job?: string | null
  monthlyIncome: number
  dateOfBirth: Date | string
}

export type FatherCreateOneWithoutOrphansInput = {
  create?: FatherCreateWithoutOrphansInput
  connect?: FatherWhereUniqueInput
}

export type GuardianCreateWithoutOrphansInput = {
  firstName: string
  middleName: string
  lastName: string
  gender: string
  nationality: string
  state: string
  zone: string
  district: string
  kebele: string
  relationToOrphan: string
  email: string
  job?: string | null
  age: number
}

export type GuardianCreateOneWithoutOrphansInput = {
  create?: GuardianCreateWithoutOrphansInput
  connect?: GuardianWhereUniqueInput
}

export type MotherJobCreateWithoutMotherInput = {
  currentJobTitle?: string | null
  monthlyIncome?: number | null
}

export type MotherJobCreateOneWithoutMotherInput = {
  create?: MotherJobCreateWithoutMotherInput
  connect?: MotherJobWhereUniqueInput
}

export type MotherCreateWithoutOrphansInput = {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: Date | string
  phoneNumber: number
  maritalStatus: string
  vitalStatus: string
  monthlyExpense: number
  motherjob: MotherJobCreateOneWithoutMotherInput
}

export type MotherCreateOneWithoutOrphansInput = {
  create?: MotherCreateWithoutOrphansInput
  connect?: MotherWhereUniqueInput
}

export type OrphanCreateWithoutGroupoforphansInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues?: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  siblingId: number
  siblings?: SiblingCreateManyWithoutOrphanInput
  iga_property: Iga_propertyCreateOneWithoutOrphansInput
  education: EducationCreateOneWithoutOrphansInput
  father: FatherCreateOneWithoutOrphansInput
  guardian: GuardianCreateOneWithoutOrphansInput
  mother: MotherCreateOneWithoutOrphansInput
}

export type OrphanCreateManyWithoutGroupoforphansInput = {
  create?: Enumerable<OrphanCreateWithoutGroupoforphansInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type GroupOfOrphansCreateWithoutSiteInput = {
  registrationDate: Date | string
  donor: DonorCreateOneWithoutGroupsOfOrphansInput
  socialworker: SocialWorkerCreateOneWithoutGroupoforphansInput
  orphans?: OrphanCreateManyWithoutGroupoforphansInput
}

export type GroupOfOrphansCreateManyWithoutSiteInput = {
  create?: Enumerable<GroupOfOrphansCreateWithoutSiteInput>
  connect?: Enumerable<GroupOfOrphansWhereUniqueInput>
}

export type SiteCreateWithoutGroupoforphansInput = {
  siteName: string
  donationAmount: number
  address: AddressCreateOneWithoutSiteInput
  socialworker?: SocialWorkerCreateManyWithoutSiteInput
}

export type SiteCreateOneWithoutGroupoforphansInput = {
  create?: SiteCreateWithoutGroupoforphansInput
  connect?: SiteWhereUniqueInput
}

export type GroupOfOrphansCreateWithoutSocialworkerInput = {
  registrationDate: Date | string
  donor: DonorCreateOneWithoutGroupsOfOrphansInput
  site: SiteCreateOneWithoutGroupoforphansInput
  orphans?: OrphanCreateManyWithoutGroupoforphansInput
}

export type GroupOfOrphansCreateManyWithoutSocialworkerInput = {
  create?: Enumerable<GroupOfOrphansCreateWithoutSocialworkerInput>
  connect?: Enumerable<GroupOfOrphansWhereUniqueInput>
}

export type SocialWorkerCreateWithoutSiteInput = {
  fullName: string
  phoneNumber: number
  email: string
  groupoforphans?: GroupOfOrphansCreateManyWithoutSocialworkerInput
}

export type SocialWorkerCreateManyWithoutSiteInput = {
  create?: Enumerable<SocialWorkerCreateWithoutSiteInput>
  connect?: Enumerable<SocialWorkerWhereUniqueInput>
}

export type SiteCreateWithoutAddressInput = {
  siteName: string
  donationAmount: number
  groupoforphans?: GroupOfOrphansCreateManyWithoutSiteInput
  socialworker?: SocialWorkerCreateManyWithoutSiteInput
}

export type SiteCreateOneWithoutAddressInput = {
  create?: SiteCreateWithoutAddressInput
  connect?: SiteWhereUniqueInput
}

export type AddressCreateInput = {
  state: string
  zone: string
  district: string
  kebele: string
  site: SiteCreateOneWithoutAddressInput
}

export type DonorUpdateWithoutGroupsOfOrphansDataInput = {
  companyName?: string
  typeOfsupport?: string | null
  initialDonationAmount?: number | null
  initialReportPreparationDate?: Date | string | null
  finalReportPreparationDate?: Date | string | null
  initialDataCollectionDate?: Date | string | null
  finalDataCollectionDate?: Date | string | null
  reportDueDate?: Date | string | null
}

export type DonorUpsertWithoutGroupsOfOrphansInput = {
  update: DonorUpdateWithoutGroupsOfOrphansDataInput
  create: DonorCreateWithoutGroupsOfOrphansInput
}

export type DonorUpdateOneRequiredWithoutGroupsOfOrphansInput = {
  create?: DonorCreateWithoutGroupsOfOrphansInput
  connect?: DonorWhereUniqueInput
  update?: DonorUpdateWithoutGroupsOfOrphansDataInput
  upsert?: DonorUpsertWithoutGroupsOfOrphansInput
}

export type AddressUpdateWithoutSiteDataInput = {
  state?: string
  zone?: string
  district?: string
  kebele?: string
}

export type AddressUpsertWithoutSiteInput = {
  update: AddressUpdateWithoutSiteDataInput
  create: AddressCreateWithoutSiteInput
}

export type AddressUpdateOneRequiredWithoutSiteInput = {
  create?: AddressCreateWithoutSiteInput
  connect?: AddressWhereUniqueInput
  update?: AddressUpdateWithoutSiteDataInput
  upsert?: AddressUpsertWithoutSiteInput
}

export type SiteUpdateWithoutSocialworkerDataInput = {
  siteName?: string
  donationAmount?: number
  address?: AddressUpdateOneRequiredWithoutSiteInput
  groupoforphans?: GroupOfOrphansUpdateManyWithoutSiteInput
}

export type SiteUpsertWithoutSocialworkerInput = {
  update: SiteUpdateWithoutSocialworkerDataInput
  create: SiteCreateWithoutSocialworkerInput
}

export type SiteUpdateOneRequiredWithoutSocialworkerInput = {
  create?: SiteCreateWithoutSocialworkerInput
  connect?: SiteWhereUniqueInput
  update?: SiteUpdateWithoutSocialworkerDataInput
  upsert?: SiteUpsertWithoutSocialworkerInput
}

export type SocialWorkerUpdateWithoutGroupoforphansDataInput = {
  fullName?: string
  phoneNumber?: number
  email?: string
  site?: SiteUpdateOneRequiredWithoutSocialworkerInput
}

export type SocialWorkerUpsertWithoutGroupoforphansInput = {
  update: SocialWorkerUpdateWithoutGroupoforphansDataInput
  create: SocialWorkerCreateWithoutGroupoforphansInput
}

export type SocialWorkerUpdateOneRequiredWithoutGroupoforphansInput = {
  create?: SocialWorkerCreateWithoutGroupoforphansInput
  connect?: SocialWorkerWhereUniqueInput
  update?: SocialWorkerUpdateWithoutGroupoforphansDataInput
  upsert?: SocialWorkerUpsertWithoutGroupoforphansInput
}

export type SiblingUpdateWithoutOrphanDataInput = {
  fullName?: string
  gender?: string
  age?: number
  schoolGrade?: string | null
  job?: string | null
  maritalStatus?: string
}

export type SiblingUpdateWithWhereUniqueWithoutOrphanInput = {
  where: SiblingWhereUniqueInput
  data: SiblingUpdateWithoutOrphanDataInput
}

export type SiblingScalarWhereInput = {
  AND?: Enumerable<SiblingScalarWhereInput>
  OR?: Array<SiblingScalarWhereInput>
  NOT?: Enumerable<SiblingScalarWhereInput>
  id?: number | IntFilter
  fullName?: string | StringFilter
  gender?: string | StringFilter
  age?: number | IntFilter
  schoolGrade?: string | StringNullableFilter | null
  job?: string | StringNullableFilter | null
  maritalStatus?: string | StringFilter
  orphanId?: number | IntFilter
}

export type SiblingUpdateManyDataInput = {
  fullName?: string
  gender?: string
  age?: number
  schoolGrade?: string | null
  job?: string | null
  maritalStatus?: string
}

export type SiblingUpdateManyWithWhereNestedInput = {
  where: SiblingScalarWhereInput
  data: SiblingUpdateManyDataInput
}

export type SiblingUpsertWithWhereUniqueWithoutOrphanInput = {
  where: SiblingWhereUniqueInput
  update: SiblingUpdateWithoutOrphanDataInput
  create: SiblingCreateWithoutOrphanInput
}

export type SiblingUpdateManyWithoutOrphanInput = {
  create?: Enumerable<SiblingCreateWithoutOrphanInput>
  connect?: Enumerable<SiblingWhereUniqueInput>
  set?: Enumerable<SiblingWhereUniqueInput>
  disconnect?: Enumerable<SiblingWhereUniqueInput>
  delete?: Enumerable<SiblingWhereUniqueInput>
  update?: Enumerable<SiblingUpdateWithWhereUniqueWithoutOrphanInput>
  updateMany?: Enumerable<SiblingUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<SiblingScalarWhereInput>
  upsert?: Enumerable<SiblingUpsertWithWhereUniqueWithoutOrphanInput>
}

export type Iga_propertyUpdateWithoutOrphansDataInput = {
  ownershipStatus?: string
  otherProperty?: string | null
}

export type Iga_propertyUpsertWithoutOrphansInput = {
  update: Iga_propertyUpdateWithoutOrphansDataInput
  create: Iga_propertyCreateWithoutOrphansInput
}

export type Iga_propertyUpdateOneRequiredWithoutOrphansInput = {
  create?: Iga_propertyCreateWithoutOrphansInput
  connect?: Iga_propertyWhereUniqueInput
  update?: Iga_propertyUpdateWithoutOrphansDataInput
  upsert?: Iga_propertyUpsertWithoutOrphansInput
}

export type EducationUpdateWithoutOrphansDataInput = {
  enrollmentStatus?: educationEnrollmentStatus
  schoolName?: string | null
  typeOfSchool?: educationTypeOfSchool | null
  grade?: string | null
  reason?: string | null
  hobbies?: string | null
}

export type EducationUpsertWithoutOrphansInput = {
  update: EducationUpdateWithoutOrphansDataInput
  create: EducationCreateWithoutOrphansInput
}

export type EducationUpdateOneRequiredWithoutOrphansInput = {
  create?: EducationCreateWithoutOrphansInput
  connect?: EducationWhereUniqueInput
  update?: EducationUpdateWithoutOrphansDataInput
  upsert?: EducationUpsertWithoutOrphansInput
}

export type FatherUpdateWithoutOrphansDataInput = {
  dateOfDeath?: Date | string
  causeOfDeath?: string
  job?: string | null
  monthlyIncome?: number
  dateOfBirth?: Date | string
}

export type FatherUpsertWithoutOrphansInput = {
  update: FatherUpdateWithoutOrphansDataInput
  create: FatherCreateWithoutOrphansInput
}

export type FatherUpdateOneRequiredWithoutOrphansInput = {
  create?: FatherCreateWithoutOrphansInput
  connect?: FatherWhereUniqueInput
  update?: FatherUpdateWithoutOrphansDataInput
  upsert?: FatherUpsertWithoutOrphansInput
}

export type GuardianUpdateWithoutOrphansDataInput = {
  firstName?: string
  middleName?: string
  lastName?: string
  gender?: string
  nationality?: string
  state?: string
  zone?: string
  district?: string
  kebele?: string
  relationToOrphan?: string
  email?: string
  job?: string | null
  age?: number
}

export type GuardianUpsertWithoutOrphansInput = {
  update: GuardianUpdateWithoutOrphansDataInput
  create: GuardianCreateWithoutOrphansInput
}

export type GuardianUpdateOneRequiredWithoutOrphansInput = {
  create?: GuardianCreateWithoutOrphansInput
  connect?: GuardianWhereUniqueInput
  update?: GuardianUpdateWithoutOrphansDataInput
  upsert?: GuardianUpsertWithoutOrphansInput
}

export type MotherJobUpdateWithoutMotherDataInput = {
  currentJobTitle?: string | null
  monthlyIncome?: number | null
}

export type MotherJobUpsertWithoutMotherInput = {
  update: MotherJobUpdateWithoutMotherDataInput
  create: MotherJobCreateWithoutMotherInput
}

export type MotherJobUpdateOneRequiredWithoutMotherInput = {
  create?: MotherJobCreateWithoutMotherInput
  connect?: MotherJobWhereUniqueInput
  update?: MotherJobUpdateWithoutMotherDataInput
  upsert?: MotherJobUpsertWithoutMotherInput
}

export type MotherUpdateWithoutOrphansDataInput = {
  firstName?: string
  middleName?: string
  lastName?: string
  dateOfBirth?: Date | string
  phoneNumber?: number
  maritalStatus?: string
  vitalStatus?: string
  monthlyExpense?: number
  motherjob?: MotherJobUpdateOneRequiredWithoutMotherInput
}

export type MotherUpsertWithoutOrphansInput = {
  update: MotherUpdateWithoutOrphansDataInput
  create: MotherCreateWithoutOrphansInput
}

export type MotherUpdateOneRequiredWithoutOrphansInput = {
  create?: MotherCreateWithoutOrphansInput
  connect?: MotherWhereUniqueInput
  update?: MotherUpdateWithoutOrphansDataInput
  upsert?: MotherUpsertWithoutOrphansInput
}

export type OrphanUpdateWithoutGroupoforphansDataInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
  siblings?: SiblingUpdateManyWithoutOrphanInput
  iga_property?: Iga_propertyUpdateOneRequiredWithoutOrphansInput
  education?: EducationUpdateOneRequiredWithoutOrphansInput
  father?: FatherUpdateOneRequiredWithoutOrphansInput
  guardian?: GuardianUpdateOneRequiredWithoutOrphansInput
  mother?: MotherUpdateOneRequiredWithoutOrphansInput
}

export type OrphanUpdateWithWhereUniqueWithoutGroupoforphansInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutGroupoforphansDataInput
}

export type OrphanScalarWhereInput = {
  AND?: Enumerable<OrphanScalarWhereInput>
  OR?: Array<OrphanScalarWhereInput>
  NOT?: Enumerable<OrphanScalarWhereInput>
  id?: number | IntFilter
  firstName?: string | StringFilter
  fatherName?: string | StringFilter
  grandFatherName?: string | StringFilter
  greatGrandFatherName?: string | StringFilter
  gender?: orphanGender | EnumorphanGenderFilter
  placeOfBirth?: string | StringFilter
  dateOfBirth?: Date | string | DateTimeFilter
  numberOfSponserdSiblings?: number | IntFilter
  physicalHealthStatus?: string | StringFilter
  psychologicalHealthStatus?: string | StringFilter
  otherHealthIssues?: string | StringNullableFilter | null
  photoPortraitUrl?: string | StringFilter
  photoLongUrl?: string | StringFilter
  fatherId?: number | IntFilter
  motherId?: number | IntFilter
  guardianId?: number | IntFilter
  groupId?: number | IntFilter
  siblingId?: number | IntFilter
  IGA_PropertyId?: number | IntFilter
  educationId?: number | IntFilter
}

export type OrphanUpdateManyDataInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
}

export type OrphanUpdateManyWithWhereNestedInput = {
  where: OrphanScalarWhereInput
  data: OrphanUpdateManyDataInput
}

export type OrphanUpsertWithWhereUniqueWithoutGroupoforphansInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutGroupoforphansDataInput
  create: OrphanCreateWithoutGroupoforphansInput
}

export type OrphanUpdateManyWithoutGroupoforphansInput = {
  create?: Enumerable<OrphanCreateWithoutGroupoforphansInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
  set?: Enumerable<OrphanWhereUniqueInput>
  disconnect?: Enumerable<OrphanWhereUniqueInput>
  delete?: Enumerable<OrphanWhereUniqueInput>
  update?: Enumerable<OrphanUpdateWithWhereUniqueWithoutGroupoforphansInput>
  updateMany?: Enumerable<OrphanUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<OrphanScalarWhereInput>
  upsert?: Enumerable<OrphanUpsertWithWhereUniqueWithoutGroupoforphansInput>
}

export type GroupOfOrphansUpdateWithoutSiteDataInput = {
  registrationDate?: Date | string
  donor?: DonorUpdateOneRequiredWithoutGroupsOfOrphansInput
  socialworker?: SocialWorkerUpdateOneRequiredWithoutGroupoforphansInput
  orphans?: OrphanUpdateManyWithoutGroupoforphansInput
}

export type GroupOfOrphansUpdateWithWhereUniqueWithoutSiteInput = {
  where: GroupOfOrphansWhereUniqueInput
  data: GroupOfOrphansUpdateWithoutSiteDataInput
}

export type GroupOfOrphansScalarWhereInput = {
  AND?: Enumerable<GroupOfOrphansScalarWhereInput>
  OR?: Array<GroupOfOrphansScalarWhereInput>
  NOT?: Enumerable<GroupOfOrphansScalarWhereInput>
  id?: number | IntFilter
  registrationDate?: Date | string | DateTimeFilter
  donorId?: number | IntFilter
  socialWorkerId?: number | IntFilter
  siteId?: number | IntFilter
}

export type GroupOfOrphansUpdateManyDataInput = {
  registrationDate?: Date | string
}

export type GroupOfOrphansUpdateManyWithWhereNestedInput = {
  where: GroupOfOrphansScalarWhereInput
  data: GroupOfOrphansUpdateManyDataInput
}

export type GroupOfOrphansUpsertWithWhereUniqueWithoutSiteInput = {
  where: GroupOfOrphansWhereUniqueInput
  update: GroupOfOrphansUpdateWithoutSiteDataInput
  create: GroupOfOrphansCreateWithoutSiteInput
}

export type GroupOfOrphansUpdateManyWithoutSiteInput = {
  create?: Enumerable<GroupOfOrphansCreateWithoutSiteInput>
  connect?: Enumerable<GroupOfOrphansWhereUniqueInput>
  set?: Enumerable<GroupOfOrphansWhereUniqueInput>
  disconnect?: Enumerable<GroupOfOrphansWhereUniqueInput>
  delete?: Enumerable<GroupOfOrphansWhereUniqueInput>
  update?: Enumerable<GroupOfOrphansUpdateWithWhereUniqueWithoutSiteInput>
  updateMany?: Enumerable<GroupOfOrphansUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<GroupOfOrphansScalarWhereInput>
  upsert?: Enumerable<GroupOfOrphansUpsertWithWhereUniqueWithoutSiteInput>
}

export type SiteUpdateWithoutGroupoforphansDataInput = {
  siteName?: string
  donationAmount?: number
  address?: AddressUpdateOneRequiredWithoutSiteInput
  socialworker?: SocialWorkerUpdateManyWithoutSiteInput
}

export type SiteUpsertWithoutGroupoforphansInput = {
  update: SiteUpdateWithoutGroupoforphansDataInput
  create: SiteCreateWithoutGroupoforphansInput
}

export type SiteUpdateOneRequiredWithoutGroupoforphansInput = {
  create?: SiteCreateWithoutGroupoforphansInput
  connect?: SiteWhereUniqueInput
  update?: SiteUpdateWithoutGroupoforphansDataInput
  upsert?: SiteUpsertWithoutGroupoforphansInput
}

export type GroupOfOrphansUpdateWithoutSocialworkerDataInput = {
  registrationDate?: Date | string
  donor?: DonorUpdateOneRequiredWithoutGroupsOfOrphansInput
  site?: SiteUpdateOneRequiredWithoutGroupoforphansInput
  orphans?: OrphanUpdateManyWithoutGroupoforphansInput
}

export type GroupOfOrphansUpdateWithWhereUniqueWithoutSocialworkerInput = {
  where: GroupOfOrphansWhereUniqueInput
  data: GroupOfOrphansUpdateWithoutSocialworkerDataInput
}

export type GroupOfOrphansUpsertWithWhereUniqueWithoutSocialworkerInput = {
  where: GroupOfOrphansWhereUniqueInput
  update: GroupOfOrphansUpdateWithoutSocialworkerDataInput
  create: GroupOfOrphansCreateWithoutSocialworkerInput
}

export type GroupOfOrphansUpdateManyWithoutSocialworkerInput = {
  create?: Enumerable<GroupOfOrphansCreateWithoutSocialworkerInput>
  connect?: Enumerable<GroupOfOrphansWhereUniqueInput>
  set?: Enumerable<GroupOfOrphansWhereUniqueInput>
  disconnect?: Enumerable<GroupOfOrphansWhereUniqueInput>
  delete?: Enumerable<GroupOfOrphansWhereUniqueInput>
  update?: Enumerable<GroupOfOrphansUpdateWithWhereUniqueWithoutSocialworkerInput>
  updateMany?: Enumerable<GroupOfOrphansUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<GroupOfOrphansScalarWhereInput>
  upsert?: Enumerable<GroupOfOrphansUpsertWithWhereUniqueWithoutSocialworkerInput>
}

export type SocialWorkerUpdateWithoutSiteDataInput = {
  fullName?: string
  phoneNumber?: number
  email?: string
  groupoforphans?: GroupOfOrphansUpdateManyWithoutSocialworkerInput
}

export type SocialWorkerUpdateWithWhereUniqueWithoutSiteInput = {
  where: SocialWorkerWhereUniqueInput
  data: SocialWorkerUpdateWithoutSiteDataInput
}

export type SocialWorkerScalarWhereInput = {
  AND?: Enumerable<SocialWorkerScalarWhereInput>
  OR?: Array<SocialWorkerScalarWhereInput>
  NOT?: Enumerable<SocialWorkerScalarWhereInput>
  id?: number | IntFilter
  fullName?: string | StringFilter
  phoneNumber?: number | IntFilter
  email?: string | StringFilter
  siteId?: number | IntFilter
}

export type SocialWorkerUpdateManyDataInput = {
  fullName?: string
  phoneNumber?: number
  email?: string
}

export type SocialWorkerUpdateManyWithWhereNestedInput = {
  where: SocialWorkerScalarWhereInput
  data: SocialWorkerUpdateManyDataInput
}

export type SocialWorkerUpsertWithWhereUniqueWithoutSiteInput = {
  where: SocialWorkerWhereUniqueInput
  update: SocialWorkerUpdateWithoutSiteDataInput
  create: SocialWorkerCreateWithoutSiteInput
}

export type SocialWorkerUpdateManyWithoutSiteInput = {
  create?: Enumerable<SocialWorkerCreateWithoutSiteInput>
  connect?: Enumerable<SocialWorkerWhereUniqueInput>
  set?: Enumerable<SocialWorkerWhereUniqueInput>
  disconnect?: Enumerable<SocialWorkerWhereUniqueInput>
  delete?: Enumerable<SocialWorkerWhereUniqueInput>
  update?: Enumerable<SocialWorkerUpdateWithWhereUniqueWithoutSiteInput>
  updateMany?: Enumerable<SocialWorkerUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<SocialWorkerScalarWhereInput>
  upsert?: Enumerable<SocialWorkerUpsertWithWhereUniqueWithoutSiteInput>
}

export type SiteUpdateWithoutAddressDataInput = {
  siteName?: string
  donationAmount?: number
  groupoforphans?: GroupOfOrphansUpdateManyWithoutSiteInput
  socialworker?: SocialWorkerUpdateManyWithoutSiteInput
}

export type SiteUpsertWithoutAddressInput = {
  update: SiteUpdateWithoutAddressDataInput
  create: SiteCreateWithoutAddressInput
}

export type SiteUpdateOneRequiredWithoutAddressInput = {
  create?: SiteCreateWithoutAddressInput
  connect?: SiteWhereUniqueInput
  update?: SiteUpdateWithoutAddressDataInput
  upsert?: SiteUpsertWithoutAddressInput
}

export type AddressUpdateInput = {
  state?: string
  zone?: string
  district?: string
  kebele?: string
  site?: SiteUpdateOneRequiredWithoutAddressInput
}

export type AddressUpdateManyMutationInput = {
  state?: string
  zone?: string
  district?: string
  kebele?: string
}

export type GroupOfOrphansCreateWithoutDonorInput = {
  registrationDate: Date | string
  site: SiteCreateOneWithoutGroupoforphansInput
  socialworker: SocialWorkerCreateOneWithoutGroupoforphansInput
  orphans?: OrphanCreateManyWithoutGroupoforphansInput
}

export type GroupOfOrphansCreateManyWithoutDonorInput = {
  create?: Enumerable<GroupOfOrphansCreateWithoutDonorInput>
  connect?: Enumerable<GroupOfOrphansWhereUniqueInput>
}

export type DonorCreateInput = {
  companyName: string
  typeOfsupport?: string | null
  initialDonationAmount?: number | null
  initialReportPreparationDate?: Date | string | null
  finalReportPreparationDate?: Date | string | null
  initialDataCollectionDate?: Date | string | null
  finalDataCollectionDate?: Date | string | null
  reportDueDate?: Date | string | null
  groupsOfOrphans?: GroupOfOrphansCreateManyWithoutDonorInput
}

export type GroupOfOrphansUpdateWithoutDonorDataInput = {
  registrationDate?: Date | string
  site?: SiteUpdateOneRequiredWithoutGroupoforphansInput
  socialworker?: SocialWorkerUpdateOneRequiredWithoutGroupoforphansInput
  orphans?: OrphanUpdateManyWithoutGroupoforphansInput
}

export type GroupOfOrphansUpdateWithWhereUniqueWithoutDonorInput = {
  where: GroupOfOrphansWhereUniqueInput
  data: GroupOfOrphansUpdateWithoutDonorDataInput
}

export type GroupOfOrphansUpsertWithWhereUniqueWithoutDonorInput = {
  where: GroupOfOrphansWhereUniqueInput
  update: GroupOfOrphansUpdateWithoutDonorDataInput
  create: GroupOfOrphansCreateWithoutDonorInput
}

export type GroupOfOrphansUpdateManyWithoutDonorInput = {
  create?: Enumerable<GroupOfOrphansCreateWithoutDonorInput>
  connect?: Enumerable<GroupOfOrphansWhereUniqueInput>
  set?: Enumerable<GroupOfOrphansWhereUniqueInput>
  disconnect?: Enumerable<GroupOfOrphansWhereUniqueInput>
  delete?: Enumerable<GroupOfOrphansWhereUniqueInput>
  update?: Enumerable<GroupOfOrphansUpdateWithWhereUniqueWithoutDonorInput>
  updateMany?: Enumerable<GroupOfOrphansUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<GroupOfOrphansScalarWhereInput>
  upsert?: Enumerable<GroupOfOrphansUpsertWithWhereUniqueWithoutDonorInput>
}

export type DonorUpdateInput = {
  companyName?: string
  typeOfsupport?: string | null
  initialDonationAmount?: number | null
  initialReportPreparationDate?: Date | string | null
  finalReportPreparationDate?: Date | string | null
  initialDataCollectionDate?: Date | string | null
  finalDataCollectionDate?: Date | string | null
  reportDueDate?: Date | string | null
  groupsOfOrphans?: GroupOfOrphansUpdateManyWithoutDonorInput
}

export type DonorUpdateManyMutationInput = {
  companyName?: string
  typeOfsupport?: string | null
  initialDonationAmount?: number | null
  initialReportPreparationDate?: Date | string | null
  finalReportPreparationDate?: Date | string | null
  initialDataCollectionDate?: Date | string | null
  finalDataCollectionDate?: Date | string | null
  reportDueDate?: Date | string | null
}

export type GroupOfOrphansCreateWithoutOrphansInput = {
  registrationDate: Date | string
  donor: DonorCreateOneWithoutGroupsOfOrphansInput
  site: SiteCreateOneWithoutGroupoforphansInput
  socialworker: SocialWorkerCreateOneWithoutGroupoforphansInput
}

export type GroupOfOrphansCreateOneWithoutOrphansInput = {
  create?: GroupOfOrphansCreateWithoutOrphansInput
  connect?: GroupOfOrphansWhereUniqueInput
}

export type OrphanCreateWithoutEducationInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues?: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  siblingId: number
  siblings?: SiblingCreateManyWithoutOrphanInput
  iga_property: Iga_propertyCreateOneWithoutOrphansInput
  father: FatherCreateOneWithoutOrphansInput
  groupoforphans: GroupOfOrphansCreateOneWithoutOrphansInput
  guardian: GuardianCreateOneWithoutOrphansInput
  mother: MotherCreateOneWithoutOrphansInput
}

export type OrphanCreateManyWithoutEducationInput = {
  create?: Enumerable<OrphanCreateWithoutEducationInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type EducationCreateInput = {
  enrollmentStatus: educationEnrollmentStatus
  schoolName?: string | null
  typeOfSchool?: educationTypeOfSchool | null
  grade?: string | null
  reason?: string | null
  hobbies?: string | null
  orphans?: OrphanCreateManyWithoutEducationInput
}

export type GroupOfOrphansUpdateWithoutOrphansDataInput = {
  registrationDate?: Date | string
  donor?: DonorUpdateOneRequiredWithoutGroupsOfOrphansInput
  site?: SiteUpdateOneRequiredWithoutGroupoforphansInput
  socialworker?: SocialWorkerUpdateOneRequiredWithoutGroupoforphansInput
}

export type GroupOfOrphansUpsertWithoutOrphansInput = {
  update: GroupOfOrphansUpdateWithoutOrphansDataInput
  create: GroupOfOrphansCreateWithoutOrphansInput
}

export type GroupOfOrphansUpdateOneRequiredWithoutOrphansInput = {
  create?: GroupOfOrphansCreateWithoutOrphansInput
  connect?: GroupOfOrphansWhereUniqueInput
  update?: GroupOfOrphansUpdateWithoutOrphansDataInput
  upsert?: GroupOfOrphansUpsertWithoutOrphansInput
}

export type OrphanUpdateWithoutEducationDataInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
  siblings?: SiblingUpdateManyWithoutOrphanInput
  iga_property?: Iga_propertyUpdateOneRequiredWithoutOrphansInput
  father?: FatherUpdateOneRequiredWithoutOrphansInput
  groupoforphans?: GroupOfOrphansUpdateOneRequiredWithoutOrphansInput
  guardian?: GuardianUpdateOneRequiredWithoutOrphansInput
  mother?: MotherUpdateOneRequiredWithoutOrphansInput
}

export type OrphanUpdateWithWhereUniqueWithoutEducationInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutEducationDataInput
}

export type OrphanUpsertWithWhereUniqueWithoutEducationInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutEducationDataInput
  create: OrphanCreateWithoutEducationInput
}

export type OrphanUpdateManyWithoutEducationInput = {
  create?: Enumerable<OrphanCreateWithoutEducationInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
  set?: Enumerable<OrphanWhereUniqueInput>
  disconnect?: Enumerable<OrphanWhereUniqueInput>
  delete?: Enumerable<OrphanWhereUniqueInput>
  update?: Enumerable<OrphanUpdateWithWhereUniqueWithoutEducationInput>
  updateMany?: Enumerable<OrphanUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<OrphanScalarWhereInput>
  upsert?: Enumerable<OrphanUpsertWithWhereUniqueWithoutEducationInput>
}

export type EducationUpdateInput = {
  enrollmentStatus?: educationEnrollmentStatus
  schoolName?: string | null
  typeOfSchool?: educationTypeOfSchool | null
  grade?: string | null
  reason?: string | null
  hobbies?: string | null
  orphans?: OrphanUpdateManyWithoutEducationInput
}

export type EducationUpdateManyMutationInput = {
  enrollmentStatus?: educationEnrollmentStatus
  schoolName?: string | null
  typeOfSchool?: educationTypeOfSchool | null
  grade?: string | null
  reason?: string | null
  hobbies?: string | null
}

export type OrphanCreateWithoutFatherInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues?: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  siblingId: number
  siblings?: SiblingCreateManyWithoutOrphanInput
  iga_property: Iga_propertyCreateOneWithoutOrphansInput
  education: EducationCreateOneWithoutOrphansInput
  groupoforphans: GroupOfOrphansCreateOneWithoutOrphansInput
  guardian: GuardianCreateOneWithoutOrphansInput
  mother: MotherCreateOneWithoutOrphansInput
}

export type OrphanCreateManyWithoutFatherInput = {
  create?: Enumerable<OrphanCreateWithoutFatherInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type FatherCreateInput = {
  dateOfDeath: Date | string
  causeOfDeath: string
  job?: string | null
  monthlyIncome: number
  dateOfBirth: Date | string
  orphans?: OrphanCreateManyWithoutFatherInput
}

export type OrphanUpdateWithoutFatherDataInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
  siblings?: SiblingUpdateManyWithoutOrphanInput
  iga_property?: Iga_propertyUpdateOneRequiredWithoutOrphansInput
  education?: EducationUpdateOneRequiredWithoutOrphansInput
  groupoforphans?: GroupOfOrphansUpdateOneRequiredWithoutOrphansInput
  guardian?: GuardianUpdateOneRequiredWithoutOrphansInput
  mother?: MotherUpdateOneRequiredWithoutOrphansInput
}

export type OrphanUpdateWithWhereUniqueWithoutFatherInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutFatherDataInput
}

export type OrphanUpsertWithWhereUniqueWithoutFatherInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutFatherDataInput
  create: OrphanCreateWithoutFatherInput
}

export type OrphanUpdateManyWithoutFatherInput = {
  create?: Enumerable<OrphanCreateWithoutFatherInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
  set?: Enumerable<OrphanWhereUniqueInput>
  disconnect?: Enumerable<OrphanWhereUniqueInput>
  delete?: Enumerable<OrphanWhereUniqueInput>
  update?: Enumerable<OrphanUpdateWithWhereUniqueWithoutFatherInput>
  updateMany?: Enumerable<OrphanUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<OrphanScalarWhereInput>
  upsert?: Enumerable<OrphanUpsertWithWhereUniqueWithoutFatherInput>
}

export type FatherUpdateInput = {
  dateOfDeath?: Date | string
  causeOfDeath?: string
  job?: string | null
  monthlyIncome?: number
  dateOfBirth?: Date | string
  orphans?: OrphanUpdateManyWithoutFatherInput
}

export type FatherUpdateManyMutationInput = {
  dateOfDeath?: Date | string
  causeOfDeath?: string
  job?: string | null
  monthlyIncome?: number
  dateOfBirth?: Date | string
}

export type GroupOfOrphansCreateInput = {
  registrationDate: Date | string
  donor: DonorCreateOneWithoutGroupsOfOrphansInput
  site: SiteCreateOneWithoutGroupoforphansInput
  socialworker: SocialWorkerCreateOneWithoutGroupoforphansInput
  orphans?: OrphanCreateManyWithoutGroupoforphansInput
}

export type GroupOfOrphansUpdateInput = {
  registrationDate?: Date | string
  donor?: DonorUpdateOneRequiredWithoutGroupsOfOrphansInput
  site?: SiteUpdateOneRequiredWithoutGroupoforphansInput
  socialworker?: SocialWorkerUpdateOneRequiredWithoutGroupoforphansInput
  orphans?: OrphanUpdateManyWithoutGroupoforphansInput
}

export type GroupOfOrphansUpdateManyMutationInput = {
  registrationDate?: Date | string
}

export type OrphanCreateWithoutGuardianInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues?: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  siblingId: number
  siblings?: SiblingCreateManyWithoutOrphanInput
  iga_property: Iga_propertyCreateOneWithoutOrphansInput
  education: EducationCreateOneWithoutOrphansInput
  father: FatherCreateOneWithoutOrphansInput
  groupoforphans: GroupOfOrphansCreateOneWithoutOrphansInput
  mother: MotherCreateOneWithoutOrphansInput
}

export type OrphanCreateManyWithoutGuardianInput = {
  create?: Enumerable<OrphanCreateWithoutGuardianInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type GuardianCreateInput = {
  firstName: string
  middleName: string
  lastName: string
  gender: string
  nationality: string
  state: string
  zone: string
  district: string
  kebele: string
  relationToOrphan: string
  email: string
  job?: string | null
  age: number
  orphans?: OrphanCreateManyWithoutGuardianInput
}

export type OrphanUpdateWithoutGuardianDataInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
  siblings?: SiblingUpdateManyWithoutOrphanInput
  iga_property?: Iga_propertyUpdateOneRequiredWithoutOrphansInput
  education?: EducationUpdateOneRequiredWithoutOrphansInput
  father?: FatherUpdateOneRequiredWithoutOrphansInput
  groupoforphans?: GroupOfOrphansUpdateOneRequiredWithoutOrphansInput
  mother?: MotherUpdateOneRequiredWithoutOrphansInput
}

export type OrphanUpdateWithWhereUniqueWithoutGuardianInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutGuardianDataInput
}

export type OrphanUpsertWithWhereUniqueWithoutGuardianInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutGuardianDataInput
  create: OrphanCreateWithoutGuardianInput
}

export type OrphanUpdateManyWithoutGuardianInput = {
  create?: Enumerable<OrphanCreateWithoutGuardianInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
  set?: Enumerable<OrphanWhereUniqueInput>
  disconnect?: Enumerable<OrphanWhereUniqueInput>
  delete?: Enumerable<OrphanWhereUniqueInput>
  update?: Enumerable<OrphanUpdateWithWhereUniqueWithoutGuardianInput>
  updateMany?: Enumerable<OrphanUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<OrphanScalarWhereInput>
  upsert?: Enumerable<OrphanUpsertWithWhereUniqueWithoutGuardianInput>
}

export type GuardianUpdateInput = {
  firstName?: string
  middleName?: string
  lastName?: string
  gender?: string
  nationality?: string
  state?: string
  zone?: string
  district?: string
  kebele?: string
  relationToOrphan?: string
  email?: string
  job?: string | null
  age?: number
  orphans?: OrphanUpdateManyWithoutGuardianInput
}

export type GuardianUpdateManyMutationInput = {
  firstName?: string
  middleName?: string
  lastName?: string
  gender?: string
  nationality?: string
  state?: string
  zone?: string
  district?: string
  kebele?: string
  relationToOrphan?: string
  email?: string
  job?: string | null
  age?: number
}

export type OrphanCreateWithoutIga_propertyInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues?: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  siblingId: number
  siblings?: SiblingCreateManyWithoutOrphanInput
  education: EducationCreateOneWithoutOrphansInput
  father: FatherCreateOneWithoutOrphansInput
  groupoforphans: GroupOfOrphansCreateOneWithoutOrphansInput
  guardian: GuardianCreateOneWithoutOrphansInput
  mother: MotherCreateOneWithoutOrphansInput
}

export type OrphanCreateManyWithoutIga_propertyInput = {
  create?: Enumerable<OrphanCreateWithoutIga_propertyInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type Iga_propertyCreateInput = {
  ownershipStatus: string
  otherProperty?: string | null
  orphans?: OrphanCreateManyWithoutIga_propertyInput
}

export type OrphanUpdateWithoutIga_propertyDataInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
  siblings?: SiblingUpdateManyWithoutOrphanInput
  education?: EducationUpdateOneRequiredWithoutOrphansInput
  father?: FatherUpdateOneRequiredWithoutOrphansInput
  groupoforphans?: GroupOfOrphansUpdateOneRequiredWithoutOrphansInput
  guardian?: GuardianUpdateOneRequiredWithoutOrphansInput
  mother?: MotherUpdateOneRequiredWithoutOrphansInput
}

export type OrphanUpdateWithWhereUniqueWithoutIga_propertyInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutIga_propertyDataInput
}

export type OrphanUpsertWithWhereUniqueWithoutIga_propertyInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutIga_propertyDataInput
  create: OrphanCreateWithoutIga_propertyInput
}

export type OrphanUpdateManyWithoutIga_propertyInput = {
  create?: Enumerable<OrphanCreateWithoutIga_propertyInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
  set?: Enumerable<OrphanWhereUniqueInput>
  disconnect?: Enumerable<OrphanWhereUniqueInput>
  delete?: Enumerable<OrphanWhereUniqueInput>
  update?: Enumerable<OrphanUpdateWithWhereUniqueWithoutIga_propertyInput>
  updateMany?: Enumerable<OrphanUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<OrphanScalarWhereInput>
  upsert?: Enumerable<OrphanUpsertWithWhereUniqueWithoutIga_propertyInput>
}

export type Iga_propertyUpdateInput = {
  ownershipStatus?: string
  otherProperty?: string | null
  orphans?: OrphanUpdateManyWithoutIga_propertyInput
}

export type Iga_propertyUpdateManyMutationInput = {
  ownershipStatus?: string
  otherProperty?: string | null
}

export type OrphanCreateWithoutMotherInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues?: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  siblingId: number
  siblings?: SiblingCreateManyWithoutOrphanInput
  iga_property: Iga_propertyCreateOneWithoutOrphansInput
  education: EducationCreateOneWithoutOrphansInput
  father: FatherCreateOneWithoutOrphansInput
  groupoforphans: GroupOfOrphansCreateOneWithoutOrphansInput
  guardian: GuardianCreateOneWithoutOrphansInput
}

export type OrphanCreateManyWithoutMotherInput = {
  create?: Enumerable<OrphanCreateWithoutMotherInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type MotherCreateInput = {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: Date | string
  phoneNumber: number
  maritalStatus: string
  vitalStatus: string
  monthlyExpense: number
  motherjob: MotherJobCreateOneWithoutMotherInput
  orphans?: OrphanCreateManyWithoutMotherInput
}

export type OrphanUpdateWithoutMotherDataInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
  siblings?: SiblingUpdateManyWithoutOrphanInput
  iga_property?: Iga_propertyUpdateOneRequiredWithoutOrphansInput
  education?: EducationUpdateOneRequiredWithoutOrphansInput
  father?: FatherUpdateOneRequiredWithoutOrphansInput
  groupoforphans?: GroupOfOrphansUpdateOneRequiredWithoutOrphansInput
  guardian?: GuardianUpdateOneRequiredWithoutOrphansInput
}

export type OrphanUpdateWithWhereUniqueWithoutMotherInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutMotherDataInput
}

export type OrphanUpsertWithWhereUniqueWithoutMotherInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutMotherDataInput
  create: OrphanCreateWithoutMotherInput
}

export type OrphanUpdateManyWithoutMotherInput = {
  create?: Enumerable<OrphanCreateWithoutMotherInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
  set?: Enumerable<OrphanWhereUniqueInput>
  disconnect?: Enumerable<OrphanWhereUniqueInput>
  delete?: Enumerable<OrphanWhereUniqueInput>
  update?: Enumerable<OrphanUpdateWithWhereUniqueWithoutMotherInput>
  updateMany?: Enumerable<OrphanUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<OrphanScalarWhereInput>
  upsert?: Enumerable<OrphanUpsertWithWhereUniqueWithoutMotherInput>
}

export type MotherUpdateInput = {
  firstName?: string
  middleName?: string
  lastName?: string
  dateOfBirth?: Date | string
  phoneNumber?: number
  maritalStatus?: string
  vitalStatus?: string
  monthlyExpense?: number
  motherjob?: MotherJobUpdateOneRequiredWithoutMotherInput
  orphans?: OrphanUpdateManyWithoutMotherInput
}

export type MotherUpdateManyMutationInput = {
  firstName?: string
  middleName?: string
  lastName?: string
  dateOfBirth?: Date | string
  phoneNumber?: number
  maritalStatus?: string
  vitalStatus?: string
  monthlyExpense?: number
}

export type MotherCreateWithoutMotherjobInput = {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: Date | string
  phoneNumber: number
  maritalStatus: string
  vitalStatus: string
  monthlyExpense: number
  orphans?: OrphanCreateManyWithoutMotherInput
}

export type MotherCreateOneWithoutMotherjobInput = {
  create?: MotherCreateWithoutMotherjobInput
  connect?: MotherWhereUniqueInput
}

export type MotherJobCreateInput = {
  currentJobTitle?: string | null
  monthlyIncome?: number | null
  mother?: MotherCreateOneWithoutMotherjobInput
}

export type MotherUpdateWithoutMotherjobDataInput = {
  firstName?: string
  middleName?: string
  lastName?: string
  dateOfBirth?: Date | string
  phoneNumber?: number
  maritalStatus?: string
  vitalStatus?: string
  monthlyExpense?: number
  orphans?: OrphanUpdateManyWithoutMotherInput
}

export type MotherUpsertWithoutMotherjobInput = {
  update: MotherUpdateWithoutMotherjobDataInput
  create: MotherCreateWithoutMotherjobInput
}

export type MotherUpdateOneRequiredWithoutMotherjobInput = {
  create?: MotherCreateWithoutMotherjobInput
  connect?: MotherWhereUniqueInput
  update?: MotherUpdateWithoutMotherjobDataInput
  upsert?: MotherUpsertWithoutMotherjobInput
}

export type MotherJobUpdateInput = {
  currentJobTitle?: string | null
  monthlyIncome?: number | null
  mother?: MotherUpdateOneRequiredWithoutMotherjobInput
}

export type MotherJobUpdateManyMutationInput = {
  currentJobTitle?: string | null
  monthlyIncome?: number | null
}

export type OrphanCreateInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues?: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  siblingId: number
  siblings?: SiblingCreateManyWithoutOrphanInput
  iga_property: Iga_propertyCreateOneWithoutOrphansInput
  education: EducationCreateOneWithoutOrphansInput
  father: FatherCreateOneWithoutOrphansInput
  groupoforphans: GroupOfOrphansCreateOneWithoutOrphansInput
  guardian: GuardianCreateOneWithoutOrphansInput
  mother: MotherCreateOneWithoutOrphansInput
}

export type OrphanUpdateInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
  siblings?: SiblingUpdateManyWithoutOrphanInput
  iga_property?: Iga_propertyUpdateOneRequiredWithoutOrphansInput
  education?: EducationUpdateOneRequiredWithoutOrphansInput
  father?: FatherUpdateOneRequiredWithoutOrphansInput
  groupoforphans?: GroupOfOrphansUpdateOneRequiredWithoutOrphansInput
  guardian?: GuardianUpdateOneRequiredWithoutOrphansInput
  mother?: MotherUpdateOneRequiredWithoutOrphansInput
}

export type OrphanUpdateManyMutationInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
}

export type OrphanCreateWithoutSiblingsInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphanGender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues?: string | null
  photoPortraitUrl: string
  photoLongUrl: string
  siblingId: number
  iga_property: Iga_propertyCreateOneWithoutOrphansInput
  education: EducationCreateOneWithoutOrphansInput
  father: FatherCreateOneWithoutOrphansInput
  groupoforphans: GroupOfOrphansCreateOneWithoutOrphansInput
  guardian: GuardianCreateOneWithoutOrphansInput
  mother: MotherCreateOneWithoutOrphansInput
}

export type OrphanCreateOneWithoutSiblingsInput = {
  create?: OrphanCreateWithoutSiblingsInput
  connect?: OrphanWhereUniqueInput
}

export type SiblingCreateInput = {
  fullName: string
  gender: string
  age: number
  schoolGrade?: string | null
  job?: string | null
  maritalStatus: string
  orphan: OrphanCreateOneWithoutSiblingsInput
}

export type OrphanUpdateWithoutSiblingsDataInput = {
  firstName?: string
  fatherName?: string
  grandFatherName?: string
  greatGrandFatherName?: string
  gender?: orphanGender
  placeOfBirth?: string
  dateOfBirth?: Date | string
  numberOfSponserdSiblings?: number
  physicalHealthStatus?: string
  psychologicalHealthStatus?: string
  otherHealthIssues?: string | null
  photoPortraitUrl?: string
  photoLongUrl?: string
  siblingId?: number
  iga_property?: Iga_propertyUpdateOneRequiredWithoutOrphansInput
  education?: EducationUpdateOneRequiredWithoutOrphansInput
  father?: FatherUpdateOneRequiredWithoutOrphansInput
  groupoforphans?: GroupOfOrphansUpdateOneRequiredWithoutOrphansInput
  guardian?: GuardianUpdateOneRequiredWithoutOrphansInput
  mother?: MotherUpdateOneRequiredWithoutOrphansInput
}

export type OrphanUpsertWithoutSiblingsInput = {
  update: OrphanUpdateWithoutSiblingsDataInput
  create: OrphanCreateWithoutSiblingsInput
}

export type OrphanUpdateOneRequiredWithoutSiblingsInput = {
  create?: OrphanCreateWithoutSiblingsInput
  connect?: OrphanWhereUniqueInput
  update?: OrphanUpdateWithoutSiblingsDataInput
  upsert?: OrphanUpsertWithoutSiblingsInput
}

export type SiblingUpdateInput = {
  fullName?: string
  gender?: string
  age?: number
  schoolGrade?: string | null
  job?: string | null
  maritalStatus?: string
  orphan?: OrphanUpdateOneRequiredWithoutSiblingsInput
}

export type SiblingUpdateManyMutationInput = {
  fullName?: string
  gender?: string
  age?: number
  schoolGrade?: string | null
  job?: string | null
  maritalStatus?: string
}

export type SiteCreateInput = {
  siteName: string
  donationAmount: number
  address: AddressCreateOneWithoutSiteInput
  groupoforphans?: GroupOfOrphansCreateManyWithoutSiteInput
  socialworker?: SocialWorkerCreateManyWithoutSiteInput
}

export type SiteUpdateInput = {
  siteName?: string
  donationAmount?: number
  address?: AddressUpdateOneRequiredWithoutSiteInput
  groupoforphans?: GroupOfOrphansUpdateManyWithoutSiteInput
  socialworker?: SocialWorkerUpdateManyWithoutSiteInput
}

export type SiteUpdateManyMutationInput = {
  siteName?: string
  donationAmount?: number
}

export type SocialWorkerCreateInput = {
  fullName: string
  phoneNumber: number
  email: string
  site: SiteCreateOneWithoutSocialworkerInput
  groupoforphans?: GroupOfOrphansCreateManyWithoutSocialworkerInput
}

export type SocialWorkerUpdateInput = {
  fullName?: string
  phoneNumber?: number
  email?: string
  site?: SiteUpdateOneRequiredWithoutSocialworkerInput
  groupoforphans?: GroupOfOrphansUpdateManyWithoutSocialworkerInput
}

export type SocialWorkerUpdateManyMutationInput = {
  fullName?: string
  phoneNumber?: number
  email?: string
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
