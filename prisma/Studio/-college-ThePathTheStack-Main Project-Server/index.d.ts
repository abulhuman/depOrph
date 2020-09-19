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
 * Prisma Client JS version: 2.7.1
 * Query Engine version: 5c2ad460cf4fe8c9330e6640b266c046542c8b6a
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
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

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


export type PrismaAction =
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
  action: PrismaAction
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
 * // Fetch zero or more Donors
 * const donors = await prisma.donor.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
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
   * // Fetch zero or more Donors
   * const donors = await prisma.donor.findMany()
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
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

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
   * `prisma.educationalSupport`: Exposes CRUD operations for the **EducationalSupport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EducationalSupports
    * const educationalSupports = await prisma.educationalSupport.findMany()
    * ```
    */
  get educationalSupport(): EducationalSupportDelegate;

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
   * `prisma.financialSupport`: Exposes CRUD operations for the **FinancialSupport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FinancialSupports
    * const financialSupports = await prisma.financialSupport.findMany()
    * ```
    */
  get financialSupport(): FinancialSupportDelegate;

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
   * `prisma.officialDocuments`: Exposes CRUD operations for the **OfficialDocuments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfficialDocuments
    * const officialDocuments = await prisma.officialDocuments.findMany()
    * ```
    */
  get officialDocuments(): OfficialDocumentsDelegate;

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
   * `prisma.otherSupport`: Exposes CRUD operations for the **OtherSupport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtherSupports
    * const otherSupports = await prisma.otherSupport.findMany()
    * ```
    */
  get otherSupport(): OtherSupportDelegate;

  /**
   * `prisma.registeredGroup`: Exposes CRUD operations for the **RegisteredGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegisteredGroups
    * const registeredGroups = await prisma.registeredGroup.findMany()
    * ```
    */
  get registeredGroup(): RegisteredGroupDelegate;

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
   * `prisma.socialWorker`: Exposes CRUD operations for the **SocialWorker** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SocialWorkers
    * const socialWorkers = await prisma.socialWorker.findMany()
    * ```
    */
  get socialWorker(): SocialWorkerDelegate;

  /**
   * `prisma.sponsoredGroup`: Exposes CRUD operations for the **SponsoredGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SponsoredGroups
    * const sponsoredGroups = await prisma.sponsoredGroup.findMany()
    * ```
    */
  get sponsoredGroup(): SponsoredGroupDelegate;

  /**
   * `prisma.support`: Exposes CRUD operations for the **Support** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Supports
    * const supports = await prisma.support.findMany()
    * ```
    */
  get support(): SupportDelegate;

  /**
   * `prisma.migration`: Exposes CRUD operations for the **migration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Migrations
    * const migrations = await prisma.migration.findMany()
    * ```
    */
  get migration(): migrationDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const DonorDistinctFieldEnum: {
  id: 'id',
  companyName: 'companyName',
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


export declare const EducationalSupportDistinctFieldEnum: {
  id: 'id'
};

export declare type EducationalSupportDistinctFieldEnum = (typeof EducationalSupportDistinctFieldEnum)[keyof typeof EducationalSupportDistinctFieldEnum]


export declare const FatherDistinctFieldEnum: {
  id: 'id',
  dateOfDeath: 'dateOfDeath',
  causeOfDeath: 'causeOfDeath',
  job: 'job',
  monthlyIncome: 'monthlyIncome',
  dateOfBirth: 'dateOfBirth'
};

export declare type FatherDistinctFieldEnum = (typeof FatherDistinctFieldEnum)[keyof typeof FatherDistinctFieldEnum]


export declare const FinancialSupportDistinctFieldEnum: {
  id: 'id'
};

export declare type FinancialSupportDistinctFieldEnum = (typeof FinancialSupportDistinctFieldEnum)[keyof typeof FinancialSupportDistinctFieldEnum]


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
  jobId: 'jobId',
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


export declare const OfficialDocumentsDistinctFieldEnum: {
  id: 'id',
  photoPortraitUrl: 'photoPortraitUrl',
  photoLongUrl: 'photoLongUrl',
  fatherDeathCertificateUrl: 'fatherDeathCertificateUrl',
  birthCertificateUrl: 'birthCertificateUrl',
  guardianIDCardUrl: 'guardianIDCardUrl',
  guardianConfirmationLetterUrl: 'guardianConfirmationLetterUrl'
};

export declare type OfficialDocumentsDistinctFieldEnum = (typeof OfficialDocumentsDistinctFieldEnum)[keyof typeof OfficialDocumentsDistinctFieldEnum]


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
  fatherId: 'fatherId',
  motherId: 'motherId',
  guardianId: 'guardianId',
  IGA_PropertyId: 'IGA_PropertyId',
  educationId: 'educationId',
  docsId: 'docsId',
  regGroupId: 'regGroupId',
  sponsrGroupId: 'sponsrGroupId'
};

export declare type OrphanDistinctFieldEnum = (typeof OrphanDistinctFieldEnum)[keyof typeof OrphanDistinctFieldEnum]


export declare const OtherSupportDistinctFieldEnum: {
  id: 'id'
};

export declare type OtherSupportDistinctFieldEnum = (typeof OtherSupportDistinctFieldEnum)[keyof typeof OtherSupportDistinctFieldEnum]


export declare const RegisteredGroupDistinctFieldEnum: {
  id: 'id',
  registrationDate: 'registrationDate',
  siteName: 'siteName',
  state: 'state',
  zone: 'zone',
  district: 'district',
  kebele: 'kebele'
};

export declare type RegisteredGroupDistinctFieldEnum = (typeof RegisteredGroupDistinctFieldEnum)[keyof typeof RegisteredGroupDistinctFieldEnum]


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
  email: 'email'
};

export declare type SocialWorkerDistinctFieldEnum = (typeof SocialWorkerDistinctFieldEnum)[keyof typeof SocialWorkerDistinctFieldEnum]


export declare const SponsoredGroupDistinctFieldEnum: {
  id: 'id',
  sponsorshipDate: 'sponsorshipDate',
  supportId: 'supportId',
  donorId: 'donorId',
  socialWorkerId: 'socialWorkerId'
};

export declare type SponsoredGroupDistinctFieldEnum = (typeof SponsoredGroupDistinctFieldEnum)[keyof typeof SponsoredGroupDistinctFieldEnum]


export declare const SupportDistinctFieldEnum: {
  id: 'id',
  status: 'status',
  financialId: 'financialId',
  educationalId: 'educationalId',
  otherId: 'otherId'
};

export declare type SupportDistinctFieldEnum = (typeof SupportDistinctFieldEnum)[keyof typeof SupportDistinctFieldEnum]


export declare const MigrationDistinctFieldEnum: {
  revision: 'revision',
  name: 'name',
  datamodel: 'datamodel',
  status: 'status',
  applied: 'applied',
  rolled_back: 'rolled_back',
  datamodel_steps: 'datamodel_steps',
  database_migration: 'database_migration',
  errors: 'errors',
  started_at: 'started_at',
  finished_at: 'finished_at'
};

export declare type MigrationDistinctFieldEnum = (typeof MigrationDistinctFieldEnum)[keyof typeof MigrationDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const education_enrollmentStatus: {
  enrolled: 'enrolled',
  unenrolled: 'unenrolled',
  droppedout: 'droppedout'
};

export declare type education_enrollmentStatus = (typeof education_enrollmentStatus)[keyof typeof education_enrollmentStatus]


export declare const education_typeOfSchool: {
  private: 'private',
  public: 'public'
};

export declare type education_typeOfSchool = (typeof education_typeOfSchool)[keyof typeof education_typeOfSchool]


export declare const orphan_gender: {
  M: 'M',
  F: 'F'
};

export declare type orphan_gender = (typeof orphan_gender)[keyof typeof orphan_gender]



/**
 * Model Donor
 */

export type Donor = {
  id: number
  companyName: string
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
}

export type DonorSumAggregateOutputType = {
  id: number
}

export type DonorMinAggregateOutputType = {
  id: number
}

export type DonorMaxAggregateOutputType = {
  id: number
}


export type DonorAvgAggregateInputType = {
  id?: true
}

export type DonorSumAggregateInputType = {
  id?: true
}

export type DonorMinAggregateInputType = {
  id?: true
}

export type DonorMaxAggregateInputType = {
  id?: true
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
  initialReportPreparationDate?: boolean
  finalReportPreparationDate?: boolean
  initialDataCollectionDate?: boolean
  finalDataCollectionDate?: boolean
  reportDueDate?: boolean
  sponsoredgroups?: boolean | FindManySponsoredGroupArgs
}

export type DonorInclude = {
  sponsoredgroups?: boolean | FindManySponsoredGroupArgs
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
      P extends 'sponsoredgroups'
      ? Array<SponsoredGroupGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Donor ? Donor[P]
: 
      P extends 'sponsoredgroups'
      ? Array<SponsoredGroupGetPayload<S['select'][P]>> : never
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

  sponsoredgroups<T extends FindManySponsoredGroupArgs = {}>(args?: Subset<T, FindManySponsoredGroupArgs>): CheckSelect<T, Promise<Array<SponsoredGroup>>, Promise<Array<SponsoredGroupGetPayload<T>>>>;

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
  enrollmentStatus: education_enrollmentStatus
  schoolName: string | null
  typeOfSchool: education_typeOfSchool | null
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
  orphan?: boolean | OrphanArgs
}

export type EducationInclude = {
  orphan?: boolean | OrphanArgs
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
      P extends 'orphan'
      ? OrphanGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Education ? Education[P]
: 
      P extends 'orphan'
      ? OrphanGetPayload<S['select'][P]> : never
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
 * Model EducationalSupport
 */

export type EducationalSupport = {
  id: number
}


export type AggregateEducationalSupport = {
  count: number
  avg: EducationalSupportAvgAggregateOutputType | null
  sum: EducationalSupportSumAggregateOutputType | null
  min: EducationalSupportMinAggregateOutputType | null
  max: EducationalSupportMaxAggregateOutputType | null
}

export type EducationalSupportAvgAggregateOutputType = {
  id: number
}

export type EducationalSupportSumAggregateOutputType = {
  id: number
}

export type EducationalSupportMinAggregateOutputType = {
  id: number
}

export type EducationalSupportMaxAggregateOutputType = {
  id: number
}


export type EducationalSupportAvgAggregateInputType = {
  id?: true
}

export type EducationalSupportSumAggregateInputType = {
  id?: true
}

export type EducationalSupportMinAggregateInputType = {
  id?: true
}

export type EducationalSupportMaxAggregateInputType = {
  id?: true
}

export type AggregateEducationalSupportArgs = {
  where?: EducationalSupportWhereInput
  orderBy?: Enumerable<EducationalSupportOrderByInput>
  cursor?: EducationalSupportWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<EducationalSupportDistinctFieldEnum>
  count?: true
  avg?: EducationalSupportAvgAggregateInputType
  sum?: EducationalSupportSumAggregateInputType
  min?: EducationalSupportMinAggregateInputType
  max?: EducationalSupportMaxAggregateInputType
}

export type GetEducationalSupportAggregateType<T extends AggregateEducationalSupportArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetEducationalSupportAggregateScalarType<T[P]>
}

export type GetEducationalSupportAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof EducationalSupportAvgAggregateOutputType ? EducationalSupportAvgAggregateOutputType[P] : never
}
    
    

export type EducationalSupportSelect = {
  id?: boolean
  support?: boolean | FindManySupportArgs
}

export type EducationalSupportInclude = {
  support?: boolean | FindManySupportArgs
}

export type EducationalSupportGetPayload<
  S extends boolean | null | undefined | EducationalSupportArgs,
  U = keyof S
> = S extends true
  ? EducationalSupport
  : S extends undefined
  ? never
  : S extends EducationalSupportArgs | FindManyEducationalSupportArgs
  ? 'include' extends U
    ? EducationalSupport  & {
      [P in TrueKeys<S['include']>]:
      P extends 'support'
      ? Array<SupportGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof EducationalSupport ? EducationalSupport[P]
: 
      P extends 'support'
      ? Array<SupportGetPayload<S['select'][P]>> : never
    }
  : EducationalSupport
: EducationalSupport


export interface EducationalSupportDelegate {
  /**
   * Find zero or one EducationalSupport.
   * @param {FindOneEducationalSupportArgs} args - Arguments to find a EducationalSupport
   * @example
   * // Get one EducationalSupport
   * const educationalSupport = await prisma.educationalSupport.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneEducationalSupportArgs>(
    args: Subset<T, FindOneEducationalSupportArgs>
  ): CheckSelect<T, Prisma__EducationalSupportClient<EducationalSupport | null>, Prisma__EducationalSupportClient<EducationalSupportGetPayload<T> | null>>
  /**
   * Find zero or more EducationalSupports.
   * @param {FindManyEducationalSupportArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all EducationalSupports
   * const educationalSupports = await prisma.educationalSupport.findMany()
   * 
   * // Get first 10 EducationalSupports
   * const educationalSupports = await prisma.educationalSupport.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const educationalSupportWithIdOnly = await prisma.educationalSupport.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyEducationalSupportArgs>(
    args?: Subset<T, FindManyEducationalSupportArgs>
  ): CheckSelect<T, Promise<Array<EducationalSupport>>, Promise<Array<EducationalSupportGetPayload<T>>>>
  /**
   * Create a EducationalSupport.
   * @param {EducationalSupportCreateArgs} args - Arguments to create a EducationalSupport.
   * @example
   * // Create one EducationalSupport
   * const EducationalSupport = await prisma.educationalSupport.create({
   *   data: {
   *     // ... data to create a EducationalSupport
   *   }
   * })
   * 
  **/
  create<T extends EducationalSupportCreateArgs>(
    args: Subset<T, EducationalSupportCreateArgs>
  ): CheckSelect<T, Prisma__EducationalSupportClient<EducationalSupport>, Prisma__EducationalSupportClient<EducationalSupportGetPayload<T>>>
  /**
   * Delete a EducationalSupport.
   * @param {EducationalSupportDeleteArgs} args - Arguments to delete one EducationalSupport.
   * @example
   * // Delete one EducationalSupport
   * const EducationalSupport = await prisma.educationalSupport.delete({
   *   where: {
   *     // ... filter to delete one EducationalSupport
   *   }
   * })
   * 
  **/
  delete<T extends EducationalSupportDeleteArgs>(
    args: Subset<T, EducationalSupportDeleteArgs>
  ): CheckSelect<T, Prisma__EducationalSupportClient<EducationalSupport>, Prisma__EducationalSupportClient<EducationalSupportGetPayload<T>>>
  /**
   * Update one EducationalSupport.
   * @param {EducationalSupportUpdateArgs} args - Arguments to update one EducationalSupport.
   * @example
   * // Update one EducationalSupport
   * const educationalSupport = await prisma.educationalSupport.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends EducationalSupportUpdateArgs>(
    args: Subset<T, EducationalSupportUpdateArgs>
  ): CheckSelect<T, Prisma__EducationalSupportClient<EducationalSupport>, Prisma__EducationalSupportClient<EducationalSupportGetPayload<T>>>
  /**
   * Delete zero or more EducationalSupports.
   * @param {EducationalSupportDeleteManyArgs} args - Arguments to filter EducationalSupports to delete.
   * @example
   * // Delete a few EducationalSupports
   * const { count } = await prisma.educationalSupport.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends EducationalSupportDeleteManyArgs>(
    args: Subset<T, EducationalSupportDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more EducationalSupports.
   * @param {EducationalSupportUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many EducationalSupports
   * const educationalSupport = await prisma.educationalSupport.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends EducationalSupportUpdateManyArgs>(
    args: Subset<T, EducationalSupportUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one EducationalSupport.
   * @param {EducationalSupportUpsertArgs} args - Arguments to update or create a EducationalSupport.
   * @example
   * // Update or create a EducationalSupport
   * const educationalSupport = await prisma.educationalSupport.upsert({
   *   create: {
   *     // ... data to create a EducationalSupport
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the EducationalSupport we want to update
   *   }
   * })
  **/
  upsert<T extends EducationalSupportUpsertArgs>(
    args: Subset<T, EducationalSupportUpsertArgs>
  ): CheckSelect<T, Prisma__EducationalSupportClient<EducationalSupport>, Prisma__EducationalSupportClient<EducationalSupportGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyEducationalSupportArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateEducationalSupportArgs>(args: Subset<T, AggregateEducationalSupportArgs>): Promise<GetEducationalSupportAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for EducationalSupport.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__EducationalSupportClient<T> implements Promise<T> {
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

  support<T extends FindManySupportArgs = {}>(args?: Subset<T, FindManySupportArgs>): CheckSelect<T, Promise<Array<Support>>, Promise<Array<SupportGetPayload<T>>>>;

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
 * EducationalSupport findOne
 */
export type FindOneEducationalSupportArgs = {
  /**
   * Select specific fields to fetch from the EducationalSupport
  **/
  select?: EducationalSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationalSupportInclude | null
  /**
   * Filter, which EducationalSupport to fetch.
  **/
  where: EducationalSupportWhereUniqueInput
}


/**
 * EducationalSupport findMany
 */
export type FindManyEducationalSupportArgs = {
  /**
   * Select specific fields to fetch from the EducationalSupport
  **/
  select?: EducationalSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationalSupportInclude | null
  /**
   * Filter, which EducationalSupports to fetch.
  **/
  where?: EducationalSupportWhereInput
  /**
   * Determine the order of the EducationalSupports to fetch.
  **/
  orderBy?: Enumerable<EducationalSupportOrderByInput>
  /**
   * Sets the position for listing EducationalSupports.
  **/
  cursor?: EducationalSupportWhereUniqueInput
  /**
   * The number of EducationalSupports to fetch. If negative number, it will take EducationalSupports before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` EducationalSupports.
  **/
  skip?: number
  distinct?: Enumerable<EducationalSupportDistinctFieldEnum>
}


/**
 * EducationalSupport create
 */
export type EducationalSupportCreateArgs = {
  /**
   * Select specific fields to fetch from the EducationalSupport
  **/
  select?: EducationalSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationalSupportInclude | null
  /**
   * The data needed to create a EducationalSupport.
  **/
  data: EducationalSupportCreateInput
}


/**
 * EducationalSupport update
 */
export type EducationalSupportUpdateArgs = {
  /**
   * Select specific fields to fetch from the EducationalSupport
  **/
  select?: EducationalSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationalSupportInclude | null
  /**
   * The data needed to update a EducationalSupport.
  **/
  data: EducationalSupportUpdateInput
  /**
   * Choose, which EducationalSupport to update.
  **/
  where: EducationalSupportWhereUniqueInput
}


/**
 * EducationalSupport updateMany
 */
export type EducationalSupportUpdateManyArgs = {
  data: EducationalSupportUpdateManyMutationInput
  where?: EducationalSupportWhereInput
}


/**
 * EducationalSupport upsert
 */
export type EducationalSupportUpsertArgs = {
  /**
   * Select specific fields to fetch from the EducationalSupport
  **/
  select?: EducationalSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationalSupportInclude | null
  /**
   * The filter to search for the EducationalSupport to update in case it exists.
  **/
  where: EducationalSupportWhereUniqueInput
  /**
   * In case the EducationalSupport found by the `where` argument doesn't exist, create a new EducationalSupport with this data.
  **/
  create: EducationalSupportCreateInput
  /**
   * In case the EducationalSupport was found with the provided `where` argument, update it with this data.
  **/
  update: EducationalSupportUpdateInput
}


/**
 * EducationalSupport delete
 */
export type EducationalSupportDeleteArgs = {
  /**
   * Select specific fields to fetch from the EducationalSupport
  **/
  select?: EducationalSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationalSupportInclude | null
  /**
   * Filter which EducationalSupport to delete.
  **/
  where: EducationalSupportWhereUniqueInput
}


/**
 * EducationalSupport deleteMany
 */
export type EducationalSupportDeleteManyArgs = {
  where?: EducationalSupportWhereInput
}


/**
 * EducationalSupport without action
 */
export type EducationalSupportArgs = {
  /**
   * Select specific fields to fetch from the EducationalSupport
  **/
  select?: EducationalSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EducationalSupportInclude | null
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
 * Model FinancialSupport
 */

export type FinancialSupport = {
  id: number
}


export type AggregateFinancialSupport = {
  count: number
  avg: FinancialSupportAvgAggregateOutputType | null
  sum: FinancialSupportSumAggregateOutputType | null
  min: FinancialSupportMinAggregateOutputType | null
  max: FinancialSupportMaxAggregateOutputType | null
}

export type FinancialSupportAvgAggregateOutputType = {
  id: number
}

export type FinancialSupportSumAggregateOutputType = {
  id: number
}

export type FinancialSupportMinAggregateOutputType = {
  id: number
}

export type FinancialSupportMaxAggregateOutputType = {
  id: number
}


export type FinancialSupportAvgAggregateInputType = {
  id?: true
}

export type FinancialSupportSumAggregateInputType = {
  id?: true
}

export type FinancialSupportMinAggregateInputType = {
  id?: true
}

export type FinancialSupportMaxAggregateInputType = {
  id?: true
}

export type AggregateFinancialSupportArgs = {
  where?: FinancialSupportWhereInput
  orderBy?: Enumerable<FinancialSupportOrderByInput>
  cursor?: FinancialSupportWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<FinancialSupportDistinctFieldEnum>
  count?: true
  avg?: FinancialSupportAvgAggregateInputType
  sum?: FinancialSupportSumAggregateInputType
  min?: FinancialSupportMinAggregateInputType
  max?: FinancialSupportMaxAggregateInputType
}

export type GetFinancialSupportAggregateType<T extends AggregateFinancialSupportArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetFinancialSupportAggregateScalarType<T[P]>
}

export type GetFinancialSupportAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof FinancialSupportAvgAggregateOutputType ? FinancialSupportAvgAggregateOutputType[P] : never
}
    
    

export type FinancialSupportSelect = {
  id?: boolean
  support?: boolean | FindManySupportArgs
}

export type FinancialSupportInclude = {
  support?: boolean | FindManySupportArgs
}

export type FinancialSupportGetPayload<
  S extends boolean | null | undefined | FinancialSupportArgs,
  U = keyof S
> = S extends true
  ? FinancialSupport
  : S extends undefined
  ? never
  : S extends FinancialSupportArgs | FindManyFinancialSupportArgs
  ? 'include' extends U
    ? FinancialSupport  & {
      [P in TrueKeys<S['include']>]:
      P extends 'support'
      ? Array<SupportGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof FinancialSupport ? FinancialSupport[P]
: 
      P extends 'support'
      ? Array<SupportGetPayload<S['select'][P]>> : never
    }
  : FinancialSupport
: FinancialSupport


export interface FinancialSupportDelegate {
  /**
   * Find zero or one FinancialSupport.
   * @param {FindOneFinancialSupportArgs} args - Arguments to find a FinancialSupport
   * @example
   * // Get one FinancialSupport
   * const financialSupport = await prisma.financialSupport.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneFinancialSupportArgs>(
    args: Subset<T, FindOneFinancialSupportArgs>
  ): CheckSelect<T, Prisma__FinancialSupportClient<FinancialSupport | null>, Prisma__FinancialSupportClient<FinancialSupportGetPayload<T> | null>>
  /**
   * Find zero or more FinancialSupports.
   * @param {FindManyFinancialSupportArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all FinancialSupports
   * const financialSupports = await prisma.financialSupport.findMany()
   * 
   * // Get first 10 FinancialSupports
   * const financialSupports = await prisma.financialSupport.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const financialSupportWithIdOnly = await prisma.financialSupport.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyFinancialSupportArgs>(
    args?: Subset<T, FindManyFinancialSupportArgs>
  ): CheckSelect<T, Promise<Array<FinancialSupport>>, Promise<Array<FinancialSupportGetPayload<T>>>>
  /**
   * Create a FinancialSupport.
   * @param {FinancialSupportCreateArgs} args - Arguments to create a FinancialSupport.
   * @example
   * // Create one FinancialSupport
   * const FinancialSupport = await prisma.financialSupport.create({
   *   data: {
   *     // ... data to create a FinancialSupport
   *   }
   * })
   * 
  **/
  create<T extends FinancialSupportCreateArgs>(
    args: Subset<T, FinancialSupportCreateArgs>
  ): CheckSelect<T, Prisma__FinancialSupportClient<FinancialSupport>, Prisma__FinancialSupportClient<FinancialSupportGetPayload<T>>>
  /**
   * Delete a FinancialSupport.
   * @param {FinancialSupportDeleteArgs} args - Arguments to delete one FinancialSupport.
   * @example
   * // Delete one FinancialSupport
   * const FinancialSupport = await prisma.financialSupport.delete({
   *   where: {
   *     // ... filter to delete one FinancialSupport
   *   }
   * })
   * 
  **/
  delete<T extends FinancialSupportDeleteArgs>(
    args: Subset<T, FinancialSupportDeleteArgs>
  ): CheckSelect<T, Prisma__FinancialSupportClient<FinancialSupport>, Prisma__FinancialSupportClient<FinancialSupportGetPayload<T>>>
  /**
   * Update one FinancialSupport.
   * @param {FinancialSupportUpdateArgs} args - Arguments to update one FinancialSupport.
   * @example
   * // Update one FinancialSupport
   * const financialSupport = await prisma.financialSupport.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends FinancialSupportUpdateArgs>(
    args: Subset<T, FinancialSupportUpdateArgs>
  ): CheckSelect<T, Prisma__FinancialSupportClient<FinancialSupport>, Prisma__FinancialSupportClient<FinancialSupportGetPayload<T>>>
  /**
   * Delete zero or more FinancialSupports.
   * @param {FinancialSupportDeleteManyArgs} args - Arguments to filter FinancialSupports to delete.
   * @example
   * // Delete a few FinancialSupports
   * const { count } = await prisma.financialSupport.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends FinancialSupportDeleteManyArgs>(
    args: Subset<T, FinancialSupportDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more FinancialSupports.
   * @param {FinancialSupportUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many FinancialSupports
   * const financialSupport = await prisma.financialSupport.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends FinancialSupportUpdateManyArgs>(
    args: Subset<T, FinancialSupportUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one FinancialSupport.
   * @param {FinancialSupportUpsertArgs} args - Arguments to update or create a FinancialSupport.
   * @example
   * // Update or create a FinancialSupport
   * const financialSupport = await prisma.financialSupport.upsert({
   *   create: {
   *     // ... data to create a FinancialSupport
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the FinancialSupport we want to update
   *   }
   * })
  **/
  upsert<T extends FinancialSupportUpsertArgs>(
    args: Subset<T, FinancialSupportUpsertArgs>
  ): CheckSelect<T, Prisma__FinancialSupportClient<FinancialSupport>, Prisma__FinancialSupportClient<FinancialSupportGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyFinancialSupportArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateFinancialSupportArgs>(args: Subset<T, AggregateFinancialSupportArgs>): Promise<GetFinancialSupportAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for FinancialSupport.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__FinancialSupportClient<T> implements Promise<T> {
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

  support<T extends FindManySupportArgs = {}>(args?: Subset<T, FindManySupportArgs>): CheckSelect<T, Promise<Array<Support>>, Promise<Array<SupportGetPayload<T>>>>;

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
 * FinancialSupport findOne
 */
export type FindOneFinancialSupportArgs = {
  /**
   * Select specific fields to fetch from the FinancialSupport
  **/
  select?: FinancialSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FinancialSupportInclude | null
  /**
   * Filter, which FinancialSupport to fetch.
  **/
  where: FinancialSupportWhereUniqueInput
}


/**
 * FinancialSupport findMany
 */
export type FindManyFinancialSupportArgs = {
  /**
   * Select specific fields to fetch from the FinancialSupport
  **/
  select?: FinancialSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FinancialSupportInclude | null
  /**
   * Filter, which FinancialSupports to fetch.
  **/
  where?: FinancialSupportWhereInput
  /**
   * Determine the order of the FinancialSupports to fetch.
  **/
  orderBy?: Enumerable<FinancialSupportOrderByInput>
  /**
   * Sets the position for listing FinancialSupports.
  **/
  cursor?: FinancialSupportWhereUniqueInput
  /**
   * The number of FinancialSupports to fetch. If negative number, it will take FinancialSupports before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` FinancialSupports.
  **/
  skip?: number
  distinct?: Enumerable<FinancialSupportDistinctFieldEnum>
}


/**
 * FinancialSupport create
 */
export type FinancialSupportCreateArgs = {
  /**
   * Select specific fields to fetch from the FinancialSupport
  **/
  select?: FinancialSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FinancialSupportInclude | null
  /**
   * The data needed to create a FinancialSupport.
  **/
  data: FinancialSupportCreateInput
}


/**
 * FinancialSupport update
 */
export type FinancialSupportUpdateArgs = {
  /**
   * Select specific fields to fetch from the FinancialSupport
  **/
  select?: FinancialSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FinancialSupportInclude | null
  /**
   * The data needed to update a FinancialSupport.
  **/
  data: FinancialSupportUpdateInput
  /**
   * Choose, which FinancialSupport to update.
  **/
  where: FinancialSupportWhereUniqueInput
}


/**
 * FinancialSupport updateMany
 */
export type FinancialSupportUpdateManyArgs = {
  data: FinancialSupportUpdateManyMutationInput
  where?: FinancialSupportWhereInput
}


/**
 * FinancialSupport upsert
 */
export type FinancialSupportUpsertArgs = {
  /**
   * Select specific fields to fetch from the FinancialSupport
  **/
  select?: FinancialSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FinancialSupportInclude | null
  /**
   * The filter to search for the FinancialSupport to update in case it exists.
  **/
  where: FinancialSupportWhereUniqueInput
  /**
   * In case the FinancialSupport found by the `where` argument doesn't exist, create a new FinancialSupport with this data.
  **/
  create: FinancialSupportCreateInput
  /**
   * In case the FinancialSupport was found with the provided `where` argument, update it with this data.
  **/
  update: FinancialSupportUpdateInput
}


/**
 * FinancialSupport delete
 */
export type FinancialSupportDeleteArgs = {
  /**
   * Select specific fields to fetch from the FinancialSupport
  **/
  select?: FinancialSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FinancialSupportInclude | null
  /**
   * Filter which FinancialSupport to delete.
  **/
  where: FinancialSupportWhereUniqueInput
}


/**
 * FinancialSupport deleteMany
 */
export type FinancialSupportDeleteManyArgs = {
  where?: FinancialSupportWhereInput
}


/**
 * FinancialSupport without action
 */
export type FinancialSupportArgs = {
  /**
   * Select specific fields to fetch from the FinancialSupport
  **/
  select?: FinancialSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FinancialSupportInclude | null
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
  orphan?: boolean | FindManyOrphanArgs
}

export type Iga_propertyInclude = {
  orphan?: boolean | FindManyOrphanArgs
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
      P extends 'orphan'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Iga_property ? Iga_property[P]
: 
      P extends 'orphan'
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

  orphan<T extends FindManyOrphanArgs = {}>(args?: Subset<T, FindManyOrphanArgs>): CheckSelect<T, Promise<Array<Orphan>>, Promise<Array<OrphanGetPayload<T>>>>;

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
  phoneNumber: string
  jobId: number | null
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
  jobId: number
  monthlyExpense: number
}

export type MotherSumAggregateOutputType = {
  id: number
  jobId: number | null
  monthlyExpense: number
}

export type MotherMinAggregateOutputType = {
  id: number
  jobId: number | null
  monthlyExpense: number
}

export type MotherMaxAggregateOutputType = {
  id: number
  jobId: number | null
  monthlyExpense: number
}


export type MotherAvgAggregateInputType = {
  id?: true
  jobId?: true
  monthlyExpense?: true
}

export type MotherSumAggregateInputType = {
  id?: true
  jobId?: true
  monthlyExpense?: true
}

export type MotherMinAggregateInputType = {
  id?: true
  jobId?: true
  monthlyExpense?: true
}

export type MotherMaxAggregateInputType = {
  id?: true
  jobId?: true
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
  jobId?: boolean
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
      ? MotherJobGetPayload<S['include'][P]> | null :
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Mother ? Mother[P]
: 
      P extends 'motherjob'
      ? MotherJobGetPayload<S['select'][P]> | null :
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
 * Model OfficialDocuments
 */

export type OfficialDocuments = {
  id: number
  photoPortraitUrl: string
  photoLongUrl: string
  fatherDeathCertificateUrl: string
  birthCertificateUrl: string
  guardianIDCardUrl: string
  guardianConfirmationLetterUrl: string
}


export type AggregateOfficialDocuments = {
  count: number
  avg: OfficialDocumentsAvgAggregateOutputType | null
  sum: OfficialDocumentsSumAggregateOutputType | null
  min: OfficialDocumentsMinAggregateOutputType | null
  max: OfficialDocumentsMaxAggregateOutputType | null
}

export type OfficialDocumentsAvgAggregateOutputType = {
  id: number
}

export type OfficialDocumentsSumAggregateOutputType = {
  id: number
}

export type OfficialDocumentsMinAggregateOutputType = {
  id: number
}

export type OfficialDocumentsMaxAggregateOutputType = {
  id: number
}


export type OfficialDocumentsAvgAggregateInputType = {
  id?: true
}

export type OfficialDocumentsSumAggregateInputType = {
  id?: true
}

export type OfficialDocumentsMinAggregateInputType = {
  id?: true
}

export type OfficialDocumentsMaxAggregateInputType = {
  id?: true
}

export type AggregateOfficialDocumentsArgs = {
  where?: OfficialDocumentsWhereInput
  orderBy?: Enumerable<OfficialDocumentsOrderByInput>
  cursor?: OfficialDocumentsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OfficialDocumentsDistinctFieldEnum>
  count?: true
  avg?: OfficialDocumentsAvgAggregateInputType
  sum?: OfficialDocumentsSumAggregateInputType
  min?: OfficialDocumentsMinAggregateInputType
  max?: OfficialDocumentsMaxAggregateInputType
}

export type GetOfficialDocumentsAggregateType<T extends AggregateOfficialDocumentsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetOfficialDocumentsAggregateScalarType<T[P]>
}

export type GetOfficialDocumentsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof OfficialDocumentsAvgAggregateOutputType ? OfficialDocumentsAvgAggregateOutputType[P] : never
}
    
    

export type OfficialDocumentsSelect = {
  id?: boolean
  photoPortraitUrl?: boolean
  photoLongUrl?: boolean
  fatherDeathCertificateUrl?: boolean
  birthCertificateUrl?: boolean
  guardianIDCardUrl?: boolean
  guardianConfirmationLetterUrl?: boolean
  orphan?: boolean | OrphanArgs
}

export type OfficialDocumentsInclude = {
  orphan?: boolean | OrphanArgs
}

export type OfficialDocumentsGetPayload<
  S extends boolean | null | undefined | OfficialDocumentsArgs,
  U = keyof S
> = S extends true
  ? OfficialDocuments
  : S extends undefined
  ? never
  : S extends OfficialDocumentsArgs | FindManyOfficialDocumentsArgs
  ? 'include' extends U
    ? OfficialDocuments  & {
      [P in TrueKeys<S['include']>]:
      P extends 'orphan'
      ? OrphanGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof OfficialDocuments ? OfficialDocuments[P]
: 
      P extends 'orphan'
      ? OrphanGetPayload<S['select'][P]> : never
    }
  : OfficialDocuments
: OfficialDocuments


export interface OfficialDocumentsDelegate {
  /**
   * Find zero or one OfficialDocuments.
   * @param {FindOneOfficialDocumentsArgs} args - Arguments to find a OfficialDocuments
   * @example
   * // Get one OfficialDocuments
   * const officialDocuments = await prisma.officialDocuments.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneOfficialDocumentsArgs>(
    args: Subset<T, FindOneOfficialDocumentsArgs>
  ): CheckSelect<T, Prisma__OfficialDocumentsClient<OfficialDocuments | null>, Prisma__OfficialDocumentsClient<OfficialDocumentsGetPayload<T> | null>>
  /**
   * Find zero or more OfficialDocuments.
   * @param {FindManyOfficialDocumentsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all OfficialDocuments
   * const officialDocuments = await prisma.officialDocuments.findMany()
   * 
   * // Get first 10 OfficialDocuments
   * const officialDocuments = await prisma.officialDocuments.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const officialDocumentsWithIdOnly = await prisma.officialDocuments.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyOfficialDocumentsArgs>(
    args?: Subset<T, FindManyOfficialDocumentsArgs>
  ): CheckSelect<T, Promise<Array<OfficialDocuments>>, Promise<Array<OfficialDocumentsGetPayload<T>>>>
  /**
   * Create a OfficialDocuments.
   * @param {OfficialDocumentsCreateArgs} args - Arguments to create a OfficialDocuments.
   * @example
   * // Create one OfficialDocuments
   * const OfficialDocuments = await prisma.officialDocuments.create({
   *   data: {
   *     // ... data to create a OfficialDocuments
   *   }
   * })
   * 
  **/
  create<T extends OfficialDocumentsCreateArgs>(
    args: Subset<T, OfficialDocumentsCreateArgs>
  ): CheckSelect<T, Prisma__OfficialDocumentsClient<OfficialDocuments>, Prisma__OfficialDocumentsClient<OfficialDocumentsGetPayload<T>>>
  /**
   * Delete a OfficialDocuments.
   * @param {OfficialDocumentsDeleteArgs} args - Arguments to delete one OfficialDocuments.
   * @example
   * // Delete one OfficialDocuments
   * const OfficialDocuments = await prisma.officialDocuments.delete({
   *   where: {
   *     // ... filter to delete one OfficialDocuments
   *   }
   * })
   * 
  **/
  delete<T extends OfficialDocumentsDeleteArgs>(
    args: Subset<T, OfficialDocumentsDeleteArgs>
  ): CheckSelect<T, Prisma__OfficialDocumentsClient<OfficialDocuments>, Prisma__OfficialDocumentsClient<OfficialDocumentsGetPayload<T>>>
  /**
   * Update one OfficialDocuments.
   * @param {OfficialDocumentsUpdateArgs} args - Arguments to update one OfficialDocuments.
   * @example
   * // Update one OfficialDocuments
   * const officialDocuments = await prisma.officialDocuments.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends OfficialDocumentsUpdateArgs>(
    args: Subset<T, OfficialDocumentsUpdateArgs>
  ): CheckSelect<T, Prisma__OfficialDocumentsClient<OfficialDocuments>, Prisma__OfficialDocumentsClient<OfficialDocumentsGetPayload<T>>>
  /**
   * Delete zero or more OfficialDocuments.
   * @param {OfficialDocumentsDeleteManyArgs} args - Arguments to filter OfficialDocuments to delete.
   * @example
   * // Delete a few OfficialDocuments
   * const { count } = await prisma.officialDocuments.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends OfficialDocumentsDeleteManyArgs>(
    args: Subset<T, OfficialDocumentsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more OfficialDocuments.
   * @param {OfficialDocumentsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many OfficialDocuments
   * const officialDocuments = await prisma.officialDocuments.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends OfficialDocumentsUpdateManyArgs>(
    args: Subset<T, OfficialDocumentsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one OfficialDocuments.
   * @param {OfficialDocumentsUpsertArgs} args - Arguments to update or create a OfficialDocuments.
   * @example
   * // Update or create a OfficialDocuments
   * const officialDocuments = await prisma.officialDocuments.upsert({
   *   create: {
   *     // ... data to create a OfficialDocuments
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the OfficialDocuments we want to update
   *   }
   * })
  **/
  upsert<T extends OfficialDocumentsUpsertArgs>(
    args: Subset<T, OfficialDocumentsUpsertArgs>
  ): CheckSelect<T, Prisma__OfficialDocumentsClient<OfficialDocuments>, Prisma__OfficialDocumentsClient<OfficialDocumentsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyOfficialDocumentsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateOfficialDocumentsArgs>(args: Subset<T, AggregateOfficialDocumentsArgs>): Promise<GetOfficialDocumentsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for OfficialDocuments.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__OfficialDocumentsClient<T> implements Promise<T> {
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
 * OfficialDocuments findOne
 */
export type FindOneOfficialDocumentsArgs = {
  /**
   * Select specific fields to fetch from the OfficialDocuments
  **/
  select?: OfficialDocumentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfficialDocumentsInclude | null
  /**
   * Filter, which OfficialDocuments to fetch.
  **/
  where: OfficialDocumentsWhereUniqueInput
}


/**
 * OfficialDocuments findMany
 */
export type FindManyOfficialDocumentsArgs = {
  /**
   * Select specific fields to fetch from the OfficialDocuments
  **/
  select?: OfficialDocumentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfficialDocumentsInclude | null
  /**
   * Filter, which OfficialDocuments to fetch.
  **/
  where?: OfficialDocumentsWhereInput
  /**
   * Determine the order of the OfficialDocuments to fetch.
  **/
  orderBy?: Enumerable<OfficialDocumentsOrderByInput>
  /**
   * Sets the position for listing OfficialDocuments.
  **/
  cursor?: OfficialDocumentsWhereUniqueInput
  /**
   * The number of OfficialDocuments to fetch. If negative number, it will take OfficialDocuments before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` OfficialDocuments.
  **/
  skip?: number
  distinct?: Enumerable<OfficialDocumentsDistinctFieldEnum>
}


/**
 * OfficialDocuments create
 */
export type OfficialDocumentsCreateArgs = {
  /**
   * Select specific fields to fetch from the OfficialDocuments
  **/
  select?: OfficialDocumentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfficialDocumentsInclude | null
  /**
   * The data needed to create a OfficialDocuments.
  **/
  data: OfficialDocumentsCreateInput
}


/**
 * OfficialDocuments update
 */
export type OfficialDocumentsUpdateArgs = {
  /**
   * Select specific fields to fetch from the OfficialDocuments
  **/
  select?: OfficialDocumentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfficialDocumentsInclude | null
  /**
   * The data needed to update a OfficialDocuments.
  **/
  data: OfficialDocumentsUpdateInput
  /**
   * Choose, which OfficialDocuments to update.
  **/
  where: OfficialDocumentsWhereUniqueInput
}


/**
 * OfficialDocuments updateMany
 */
export type OfficialDocumentsUpdateManyArgs = {
  data: OfficialDocumentsUpdateManyMutationInput
  where?: OfficialDocumentsWhereInput
}


/**
 * OfficialDocuments upsert
 */
export type OfficialDocumentsUpsertArgs = {
  /**
   * Select specific fields to fetch from the OfficialDocuments
  **/
  select?: OfficialDocumentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfficialDocumentsInclude | null
  /**
   * The filter to search for the OfficialDocuments to update in case it exists.
  **/
  where: OfficialDocumentsWhereUniqueInput
  /**
   * In case the OfficialDocuments found by the `where` argument doesn't exist, create a new OfficialDocuments with this data.
  **/
  create: OfficialDocumentsCreateInput
  /**
   * In case the OfficialDocuments was found with the provided `where` argument, update it with this data.
  **/
  update: OfficialDocumentsUpdateInput
}


/**
 * OfficialDocuments delete
 */
export type OfficialDocumentsDeleteArgs = {
  /**
   * Select specific fields to fetch from the OfficialDocuments
  **/
  select?: OfficialDocumentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfficialDocumentsInclude | null
  /**
   * Filter which OfficialDocuments to delete.
  **/
  where: OfficialDocumentsWhereUniqueInput
}


/**
 * OfficialDocuments deleteMany
 */
export type OfficialDocumentsDeleteManyArgs = {
  where?: OfficialDocumentsWhereInput
}


/**
 * OfficialDocuments without action
 */
export type OfficialDocumentsArgs = {
  /**
   * Select specific fields to fetch from the OfficialDocuments
  **/
  select?: OfficialDocumentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfficialDocumentsInclude | null
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
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  fatherId: number | null
  motherId: number | null
  guardianId: number | null
  IGA_PropertyId: number | null
  educationId: number | null
  docsId: number | null
  regGroupId: number | null
  sponsrGroupId: number | null
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
  IGA_PropertyId: number
  educationId: number
  docsId: number
  regGroupId: number
  sponsrGroupId: number
}

export type OrphanSumAggregateOutputType = {
  id: number
  numberOfSponserdSiblings: number
  fatherId: number | null
  motherId: number | null
  guardianId: number | null
  IGA_PropertyId: number | null
  educationId: number | null
  docsId: number | null
  regGroupId: number | null
  sponsrGroupId: number | null
}

export type OrphanMinAggregateOutputType = {
  id: number
  numberOfSponserdSiblings: number
  fatherId: number | null
  motherId: number | null
  guardianId: number | null
  IGA_PropertyId: number | null
  educationId: number | null
  docsId: number | null
  regGroupId: number | null
  sponsrGroupId: number | null
}

export type OrphanMaxAggregateOutputType = {
  id: number
  numberOfSponserdSiblings: number
  fatherId: number | null
  motherId: number | null
  guardianId: number | null
  IGA_PropertyId: number | null
  educationId: number | null
  docsId: number | null
  regGroupId: number | null
  sponsrGroupId: number | null
}


export type OrphanAvgAggregateInputType = {
  id?: true
  numberOfSponserdSiblings?: true
  fatherId?: true
  motherId?: true
  guardianId?: true
  IGA_PropertyId?: true
  educationId?: true
  docsId?: true
  regGroupId?: true
  sponsrGroupId?: true
}

export type OrphanSumAggregateInputType = {
  id?: true
  numberOfSponserdSiblings?: true
  fatherId?: true
  motherId?: true
  guardianId?: true
  IGA_PropertyId?: true
  educationId?: true
  docsId?: true
  regGroupId?: true
  sponsrGroupId?: true
}

export type OrphanMinAggregateInputType = {
  id?: true
  numberOfSponserdSiblings?: true
  fatherId?: true
  motherId?: true
  guardianId?: true
  IGA_PropertyId?: true
  educationId?: true
  docsId?: true
  regGroupId?: true
  sponsrGroupId?: true
}

export type OrphanMaxAggregateInputType = {
  id?: true
  numberOfSponserdSiblings?: true
  fatherId?: true
  motherId?: true
  guardianId?: true
  IGA_PropertyId?: true
  educationId?: true
  docsId?: true
  regGroupId?: true
  sponsrGroupId?: true
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
  fatherId?: boolean
  motherId?: boolean
  guardianId?: boolean
  IGA_PropertyId?: boolean
  educationId?: boolean
  docsId?: boolean
  regGroupId?: boolean
  sponsrGroupId?: boolean
  iga_property?: boolean | Iga_propertyArgs
  officialdocuments?: boolean | OfficialDocumentsArgs
  education?: boolean | EducationArgs
  father?: boolean | FatherArgs
  guardian?: boolean | GuardianArgs
  mother?: boolean | MotherArgs
  registeredgroup?: boolean | RegisteredGroupArgs
  sponsoredgroup?: boolean | SponsoredGroupArgs
  siblings?: boolean | FindManySiblingArgs
}

export type OrphanInclude = {
  iga_property?: boolean | Iga_propertyArgs
  officialdocuments?: boolean | OfficialDocumentsArgs
  education?: boolean | EducationArgs
  father?: boolean | FatherArgs
  guardian?: boolean | GuardianArgs
  mother?: boolean | MotherArgs
  registeredgroup?: boolean | RegisteredGroupArgs
  sponsoredgroup?: boolean | SponsoredGroupArgs
  siblings?: boolean | FindManySiblingArgs
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
      P extends 'iga_property'
      ? Iga_propertyGetPayload<S['include'][P]> | null :
      P extends 'officialdocuments'
      ? OfficialDocumentsGetPayload<S['include'][P]> | null :
      P extends 'education'
      ? EducationGetPayload<S['include'][P]> | null :
      P extends 'father'
      ? FatherGetPayload<S['include'][P]> | null :
      P extends 'guardian'
      ? GuardianGetPayload<S['include'][P]> | null :
      P extends 'mother'
      ? MotherGetPayload<S['include'][P]> | null :
      P extends 'registeredgroup'
      ? RegisteredGroupGetPayload<S['include'][P]> | null :
      P extends 'sponsoredgroup'
      ? SponsoredGroupGetPayload<S['include'][P]> | null :
      P extends 'siblings'
      ? Array<SiblingGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Orphan ? Orphan[P]
: 
      P extends 'iga_property'
      ? Iga_propertyGetPayload<S['select'][P]> | null :
      P extends 'officialdocuments'
      ? OfficialDocumentsGetPayload<S['select'][P]> | null :
      P extends 'education'
      ? EducationGetPayload<S['select'][P]> | null :
      P extends 'father'
      ? FatherGetPayload<S['select'][P]> | null :
      P extends 'guardian'
      ? GuardianGetPayload<S['select'][P]> | null :
      P extends 'mother'
      ? MotherGetPayload<S['select'][P]> | null :
      P extends 'registeredgroup'
      ? RegisteredGroupGetPayload<S['select'][P]> | null :
      P extends 'sponsoredgroup'
      ? SponsoredGroupGetPayload<S['select'][P]> | null :
      P extends 'siblings'
      ? Array<SiblingGetPayload<S['select'][P]>> : never
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

  iga_property<T extends Iga_propertyArgs = {}>(args?: Subset<T, Iga_propertyArgs>): CheckSelect<T, Prisma__Iga_propertyClient<Iga_property | null>, Prisma__Iga_propertyClient<Iga_propertyGetPayload<T> | null>>;

  officialdocuments<T extends OfficialDocumentsArgs = {}>(args?: Subset<T, OfficialDocumentsArgs>): CheckSelect<T, Prisma__OfficialDocumentsClient<OfficialDocuments | null>, Prisma__OfficialDocumentsClient<OfficialDocumentsGetPayload<T> | null>>;

  education<T extends EducationArgs = {}>(args?: Subset<T, EducationArgs>): CheckSelect<T, Prisma__EducationClient<Education | null>, Prisma__EducationClient<EducationGetPayload<T> | null>>;

  father<T extends FatherArgs = {}>(args?: Subset<T, FatherArgs>): CheckSelect<T, Prisma__FatherClient<Father | null>, Prisma__FatherClient<FatherGetPayload<T> | null>>;

  guardian<T extends GuardianArgs = {}>(args?: Subset<T, GuardianArgs>): CheckSelect<T, Prisma__GuardianClient<Guardian | null>, Prisma__GuardianClient<GuardianGetPayload<T> | null>>;

  mother<T extends MotherArgs = {}>(args?: Subset<T, MotherArgs>): CheckSelect<T, Prisma__MotherClient<Mother | null>, Prisma__MotherClient<MotherGetPayload<T> | null>>;

  registeredgroup<T extends RegisteredGroupArgs = {}>(args?: Subset<T, RegisteredGroupArgs>): CheckSelect<T, Prisma__RegisteredGroupClient<RegisteredGroup | null>, Prisma__RegisteredGroupClient<RegisteredGroupGetPayload<T> | null>>;

  sponsoredgroup<T extends SponsoredGroupArgs = {}>(args?: Subset<T, SponsoredGroupArgs>): CheckSelect<T, Prisma__SponsoredGroupClient<SponsoredGroup | null>, Prisma__SponsoredGroupClient<SponsoredGroupGetPayload<T> | null>>;

  siblings<T extends FindManySiblingArgs = {}>(args?: Subset<T, FindManySiblingArgs>): CheckSelect<T, Promise<Array<Sibling>>, Promise<Array<SiblingGetPayload<T>>>>;

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
 * Model OtherSupport
 */

export type OtherSupport = {
  id: number
}


export type AggregateOtherSupport = {
  count: number
  avg: OtherSupportAvgAggregateOutputType | null
  sum: OtherSupportSumAggregateOutputType | null
  min: OtherSupportMinAggregateOutputType | null
  max: OtherSupportMaxAggregateOutputType | null
}

export type OtherSupportAvgAggregateOutputType = {
  id: number
}

export type OtherSupportSumAggregateOutputType = {
  id: number
}

export type OtherSupportMinAggregateOutputType = {
  id: number
}

export type OtherSupportMaxAggregateOutputType = {
  id: number
}


export type OtherSupportAvgAggregateInputType = {
  id?: true
}

export type OtherSupportSumAggregateInputType = {
  id?: true
}

export type OtherSupportMinAggregateInputType = {
  id?: true
}

export type OtherSupportMaxAggregateInputType = {
  id?: true
}

export type AggregateOtherSupportArgs = {
  where?: OtherSupportWhereInput
  orderBy?: Enumerable<OtherSupportOrderByInput>
  cursor?: OtherSupportWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OtherSupportDistinctFieldEnum>
  count?: true
  avg?: OtherSupportAvgAggregateInputType
  sum?: OtherSupportSumAggregateInputType
  min?: OtherSupportMinAggregateInputType
  max?: OtherSupportMaxAggregateInputType
}

export type GetOtherSupportAggregateType<T extends AggregateOtherSupportArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetOtherSupportAggregateScalarType<T[P]>
}

export type GetOtherSupportAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof OtherSupportAvgAggregateOutputType ? OtherSupportAvgAggregateOutputType[P] : never
}
    
    

export type OtherSupportSelect = {
  id?: boolean
  support?: boolean | FindManySupportArgs
}

export type OtherSupportInclude = {
  support?: boolean | FindManySupportArgs
}

export type OtherSupportGetPayload<
  S extends boolean | null | undefined | OtherSupportArgs,
  U = keyof S
> = S extends true
  ? OtherSupport
  : S extends undefined
  ? never
  : S extends OtherSupportArgs | FindManyOtherSupportArgs
  ? 'include' extends U
    ? OtherSupport  & {
      [P in TrueKeys<S['include']>]:
      P extends 'support'
      ? Array<SupportGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof OtherSupport ? OtherSupport[P]
: 
      P extends 'support'
      ? Array<SupportGetPayload<S['select'][P]>> : never
    }
  : OtherSupport
: OtherSupport


export interface OtherSupportDelegate {
  /**
   * Find zero or one OtherSupport.
   * @param {FindOneOtherSupportArgs} args - Arguments to find a OtherSupport
   * @example
   * // Get one OtherSupport
   * const otherSupport = await prisma.otherSupport.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneOtherSupportArgs>(
    args: Subset<T, FindOneOtherSupportArgs>
  ): CheckSelect<T, Prisma__OtherSupportClient<OtherSupport | null>, Prisma__OtherSupportClient<OtherSupportGetPayload<T> | null>>
  /**
   * Find zero or more OtherSupports.
   * @param {FindManyOtherSupportArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all OtherSupports
   * const otherSupports = await prisma.otherSupport.findMany()
   * 
   * // Get first 10 OtherSupports
   * const otherSupports = await prisma.otherSupport.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const otherSupportWithIdOnly = await prisma.otherSupport.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyOtherSupportArgs>(
    args?: Subset<T, FindManyOtherSupportArgs>
  ): CheckSelect<T, Promise<Array<OtherSupport>>, Promise<Array<OtherSupportGetPayload<T>>>>
  /**
   * Create a OtherSupport.
   * @param {OtherSupportCreateArgs} args - Arguments to create a OtherSupport.
   * @example
   * // Create one OtherSupport
   * const OtherSupport = await prisma.otherSupport.create({
   *   data: {
   *     // ... data to create a OtherSupport
   *   }
   * })
   * 
  **/
  create<T extends OtherSupportCreateArgs>(
    args: Subset<T, OtherSupportCreateArgs>
  ): CheckSelect<T, Prisma__OtherSupportClient<OtherSupport>, Prisma__OtherSupportClient<OtherSupportGetPayload<T>>>
  /**
   * Delete a OtherSupport.
   * @param {OtherSupportDeleteArgs} args - Arguments to delete one OtherSupport.
   * @example
   * // Delete one OtherSupport
   * const OtherSupport = await prisma.otherSupport.delete({
   *   where: {
   *     // ... filter to delete one OtherSupport
   *   }
   * })
   * 
  **/
  delete<T extends OtherSupportDeleteArgs>(
    args: Subset<T, OtherSupportDeleteArgs>
  ): CheckSelect<T, Prisma__OtherSupportClient<OtherSupport>, Prisma__OtherSupportClient<OtherSupportGetPayload<T>>>
  /**
   * Update one OtherSupport.
   * @param {OtherSupportUpdateArgs} args - Arguments to update one OtherSupport.
   * @example
   * // Update one OtherSupport
   * const otherSupport = await prisma.otherSupport.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends OtherSupportUpdateArgs>(
    args: Subset<T, OtherSupportUpdateArgs>
  ): CheckSelect<T, Prisma__OtherSupportClient<OtherSupport>, Prisma__OtherSupportClient<OtherSupportGetPayload<T>>>
  /**
   * Delete zero or more OtherSupports.
   * @param {OtherSupportDeleteManyArgs} args - Arguments to filter OtherSupports to delete.
   * @example
   * // Delete a few OtherSupports
   * const { count } = await prisma.otherSupport.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends OtherSupportDeleteManyArgs>(
    args: Subset<T, OtherSupportDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more OtherSupports.
   * @param {OtherSupportUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many OtherSupports
   * const otherSupport = await prisma.otherSupport.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends OtherSupportUpdateManyArgs>(
    args: Subset<T, OtherSupportUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one OtherSupport.
   * @param {OtherSupportUpsertArgs} args - Arguments to update or create a OtherSupport.
   * @example
   * // Update or create a OtherSupport
   * const otherSupport = await prisma.otherSupport.upsert({
   *   create: {
   *     // ... data to create a OtherSupport
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the OtherSupport we want to update
   *   }
   * })
  **/
  upsert<T extends OtherSupportUpsertArgs>(
    args: Subset<T, OtherSupportUpsertArgs>
  ): CheckSelect<T, Prisma__OtherSupportClient<OtherSupport>, Prisma__OtherSupportClient<OtherSupportGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyOtherSupportArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateOtherSupportArgs>(args: Subset<T, AggregateOtherSupportArgs>): Promise<GetOtherSupportAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for OtherSupport.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__OtherSupportClient<T> implements Promise<T> {
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

  support<T extends FindManySupportArgs = {}>(args?: Subset<T, FindManySupportArgs>): CheckSelect<T, Promise<Array<Support>>, Promise<Array<SupportGetPayload<T>>>>;

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
 * OtherSupport findOne
 */
export type FindOneOtherSupportArgs = {
  /**
   * Select specific fields to fetch from the OtherSupport
  **/
  select?: OtherSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OtherSupportInclude | null
  /**
   * Filter, which OtherSupport to fetch.
  **/
  where: OtherSupportWhereUniqueInput
}


/**
 * OtherSupport findMany
 */
export type FindManyOtherSupportArgs = {
  /**
   * Select specific fields to fetch from the OtherSupport
  **/
  select?: OtherSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OtherSupportInclude | null
  /**
   * Filter, which OtherSupports to fetch.
  **/
  where?: OtherSupportWhereInput
  /**
   * Determine the order of the OtherSupports to fetch.
  **/
  orderBy?: Enumerable<OtherSupportOrderByInput>
  /**
   * Sets the position for listing OtherSupports.
  **/
  cursor?: OtherSupportWhereUniqueInput
  /**
   * The number of OtherSupports to fetch. If negative number, it will take OtherSupports before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` OtherSupports.
  **/
  skip?: number
  distinct?: Enumerable<OtherSupportDistinctFieldEnum>
}


/**
 * OtherSupport create
 */
export type OtherSupportCreateArgs = {
  /**
   * Select specific fields to fetch from the OtherSupport
  **/
  select?: OtherSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OtherSupportInclude | null
  /**
   * The data needed to create a OtherSupport.
  **/
  data: OtherSupportCreateInput
}


/**
 * OtherSupport update
 */
export type OtherSupportUpdateArgs = {
  /**
   * Select specific fields to fetch from the OtherSupport
  **/
  select?: OtherSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OtherSupportInclude | null
  /**
   * The data needed to update a OtherSupport.
  **/
  data: OtherSupportUpdateInput
  /**
   * Choose, which OtherSupport to update.
  **/
  where: OtherSupportWhereUniqueInput
}


/**
 * OtherSupport updateMany
 */
export type OtherSupportUpdateManyArgs = {
  data: OtherSupportUpdateManyMutationInput
  where?: OtherSupportWhereInput
}


/**
 * OtherSupport upsert
 */
export type OtherSupportUpsertArgs = {
  /**
   * Select specific fields to fetch from the OtherSupport
  **/
  select?: OtherSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OtherSupportInclude | null
  /**
   * The filter to search for the OtherSupport to update in case it exists.
  **/
  where: OtherSupportWhereUniqueInput
  /**
   * In case the OtherSupport found by the `where` argument doesn't exist, create a new OtherSupport with this data.
  **/
  create: OtherSupportCreateInput
  /**
   * In case the OtherSupport was found with the provided `where` argument, update it with this data.
  **/
  update: OtherSupportUpdateInput
}


/**
 * OtherSupport delete
 */
export type OtherSupportDeleteArgs = {
  /**
   * Select specific fields to fetch from the OtherSupport
  **/
  select?: OtherSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OtherSupportInclude | null
  /**
   * Filter which OtherSupport to delete.
  **/
  where: OtherSupportWhereUniqueInput
}


/**
 * OtherSupport deleteMany
 */
export type OtherSupportDeleteManyArgs = {
  where?: OtherSupportWhereInput
}


/**
 * OtherSupport without action
 */
export type OtherSupportArgs = {
  /**
   * Select specific fields to fetch from the OtherSupport
  **/
  select?: OtherSupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OtherSupportInclude | null
}



/**
 * Model RegisteredGroup
 */

export type RegisteredGroup = {
  id: number
  registrationDate: Date
  siteName: string
  state: string
  zone: string
  district: string
  kebele: string
}


export type AggregateRegisteredGroup = {
  count: number
  avg: RegisteredGroupAvgAggregateOutputType | null
  sum: RegisteredGroupSumAggregateOutputType | null
  min: RegisteredGroupMinAggregateOutputType | null
  max: RegisteredGroupMaxAggregateOutputType | null
}

export type RegisteredGroupAvgAggregateOutputType = {
  id: number
}

export type RegisteredGroupSumAggregateOutputType = {
  id: number
}

export type RegisteredGroupMinAggregateOutputType = {
  id: number
}

export type RegisteredGroupMaxAggregateOutputType = {
  id: number
}


export type RegisteredGroupAvgAggregateInputType = {
  id?: true
}

export type RegisteredGroupSumAggregateInputType = {
  id?: true
}

export type RegisteredGroupMinAggregateInputType = {
  id?: true
}

export type RegisteredGroupMaxAggregateInputType = {
  id?: true
}

export type AggregateRegisteredGroupArgs = {
  where?: RegisteredGroupWhereInput
  orderBy?: Enumerable<RegisteredGroupOrderByInput>
  cursor?: RegisteredGroupWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RegisteredGroupDistinctFieldEnum>
  count?: true
  avg?: RegisteredGroupAvgAggregateInputType
  sum?: RegisteredGroupSumAggregateInputType
  min?: RegisteredGroupMinAggregateInputType
  max?: RegisteredGroupMaxAggregateInputType
}

export type GetRegisteredGroupAggregateType<T extends AggregateRegisteredGroupArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetRegisteredGroupAggregateScalarType<T[P]>
}

export type GetRegisteredGroupAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof RegisteredGroupAvgAggregateOutputType ? RegisteredGroupAvgAggregateOutputType[P] : never
}
    
    

export type RegisteredGroupSelect = {
  id?: boolean
  registrationDate?: boolean
  siteName?: boolean
  state?: boolean
  zone?: boolean
  district?: boolean
  kebele?: boolean
  orphans?: boolean | FindManyOrphanArgs
}

export type RegisteredGroupInclude = {
  orphans?: boolean | FindManyOrphanArgs
}

export type RegisteredGroupGetPayload<
  S extends boolean | null | undefined | RegisteredGroupArgs,
  U = keyof S
> = S extends true
  ? RegisteredGroup
  : S extends undefined
  ? never
  : S extends RegisteredGroupArgs | FindManyRegisteredGroupArgs
  ? 'include' extends U
    ? RegisteredGroup  & {
      [P in TrueKeys<S['include']>]:
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof RegisteredGroup ? RegisteredGroup[P]
: 
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['select'][P]>> : never
    }
  : RegisteredGroup
: RegisteredGroup


export interface RegisteredGroupDelegate {
  /**
   * Find zero or one RegisteredGroup.
   * @param {FindOneRegisteredGroupArgs} args - Arguments to find a RegisteredGroup
   * @example
   * // Get one RegisteredGroup
   * const registeredGroup = await prisma.registeredGroup.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRegisteredGroupArgs>(
    args: Subset<T, FindOneRegisteredGroupArgs>
  ): CheckSelect<T, Prisma__RegisteredGroupClient<RegisteredGroup | null>, Prisma__RegisteredGroupClient<RegisteredGroupGetPayload<T> | null>>
  /**
   * Find zero or more RegisteredGroups.
   * @param {FindManyRegisteredGroupArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all RegisteredGroups
   * const registeredGroups = await prisma.registeredGroup.findMany()
   * 
   * // Get first 10 RegisteredGroups
   * const registeredGroups = await prisma.registeredGroup.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const registeredGroupWithIdOnly = await prisma.registeredGroup.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyRegisteredGroupArgs>(
    args?: Subset<T, FindManyRegisteredGroupArgs>
  ): CheckSelect<T, Promise<Array<RegisteredGroup>>, Promise<Array<RegisteredGroupGetPayload<T>>>>
  /**
   * Create a RegisteredGroup.
   * @param {RegisteredGroupCreateArgs} args - Arguments to create a RegisteredGroup.
   * @example
   * // Create one RegisteredGroup
   * const RegisteredGroup = await prisma.registeredGroup.create({
   *   data: {
   *     // ... data to create a RegisteredGroup
   *   }
   * })
   * 
  **/
  create<T extends RegisteredGroupCreateArgs>(
    args: Subset<T, RegisteredGroupCreateArgs>
  ): CheckSelect<T, Prisma__RegisteredGroupClient<RegisteredGroup>, Prisma__RegisteredGroupClient<RegisteredGroupGetPayload<T>>>
  /**
   * Delete a RegisteredGroup.
   * @param {RegisteredGroupDeleteArgs} args - Arguments to delete one RegisteredGroup.
   * @example
   * // Delete one RegisteredGroup
   * const RegisteredGroup = await prisma.registeredGroup.delete({
   *   where: {
   *     // ... filter to delete one RegisteredGroup
   *   }
   * })
   * 
  **/
  delete<T extends RegisteredGroupDeleteArgs>(
    args: Subset<T, RegisteredGroupDeleteArgs>
  ): CheckSelect<T, Prisma__RegisteredGroupClient<RegisteredGroup>, Prisma__RegisteredGroupClient<RegisteredGroupGetPayload<T>>>
  /**
   * Update one RegisteredGroup.
   * @param {RegisteredGroupUpdateArgs} args - Arguments to update one RegisteredGroup.
   * @example
   * // Update one RegisteredGroup
   * const registeredGroup = await prisma.registeredGroup.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RegisteredGroupUpdateArgs>(
    args: Subset<T, RegisteredGroupUpdateArgs>
  ): CheckSelect<T, Prisma__RegisteredGroupClient<RegisteredGroup>, Prisma__RegisteredGroupClient<RegisteredGroupGetPayload<T>>>
  /**
   * Delete zero or more RegisteredGroups.
   * @param {RegisteredGroupDeleteManyArgs} args - Arguments to filter RegisteredGroups to delete.
   * @example
   * // Delete a few RegisteredGroups
   * const { count } = await prisma.registeredGroup.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RegisteredGroupDeleteManyArgs>(
    args: Subset<T, RegisteredGroupDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more RegisteredGroups.
   * @param {RegisteredGroupUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many RegisteredGroups
   * const registeredGroup = await prisma.registeredGroup.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RegisteredGroupUpdateManyArgs>(
    args: Subset<T, RegisteredGroupUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one RegisteredGroup.
   * @param {RegisteredGroupUpsertArgs} args - Arguments to update or create a RegisteredGroup.
   * @example
   * // Update or create a RegisteredGroup
   * const registeredGroup = await prisma.registeredGroup.upsert({
   *   create: {
   *     // ... data to create a RegisteredGroup
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the RegisteredGroup we want to update
   *   }
   * })
  **/
  upsert<T extends RegisteredGroupUpsertArgs>(
    args: Subset<T, RegisteredGroupUpsertArgs>
  ): CheckSelect<T, Prisma__RegisteredGroupClient<RegisteredGroup>, Prisma__RegisteredGroupClient<RegisteredGroupGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyRegisteredGroupArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRegisteredGroupArgs>(args: Subset<T, AggregateRegisteredGroupArgs>): Promise<GetRegisteredGroupAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for RegisteredGroup.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RegisteredGroupClient<T> implements Promise<T> {
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
 * RegisteredGroup findOne
 */
export type FindOneRegisteredGroupArgs = {
  /**
   * Select specific fields to fetch from the RegisteredGroup
  **/
  select?: RegisteredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RegisteredGroupInclude | null
  /**
   * Filter, which RegisteredGroup to fetch.
  **/
  where: RegisteredGroupWhereUniqueInput
}


/**
 * RegisteredGroup findMany
 */
export type FindManyRegisteredGroupArgs = {
  /**
   * Select specific fields to fetch from the RegisteredGroup
  **/
  select?: RegisteredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RegisteredGroupInclude | null
  /**
   * Filter, which RegisteredGroups to fetch.
  **/
  where?: RegisteredGroupWhereInput
  /**
   * Determine the order of the RegisteredGroups to fetch.
  **/
  orderBy?: Enumerable<RegisteredGroupOrderByInput>
  /**
   * Sets the position for listing RegisteredGroups.
  **/
  cursor?: RegisteredGroupWhereUniqueInput
  /**
   * The number of RegisteredGroups to fetch. If negative number, it will take RegisteredGroups before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` RegisteredGroups.
  **/
  skip?: number
  distinct?: Enumerable<RegisteredGroupDistinctFieldEnum>
}


/**
 * RegisteredGroup create
 */
export type RegisteredGroupCreateArgs = {
  /**
   * Select specific fields to fetch from the RegisteredGroup
  **/
  select?: RegisteredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RegisteredGroupInclude | null
  /**
   * The data needed to create a RegisteredGroup.
  **/
  data: RegisteredGroupCreateInput
}


/**
 * RegisteredGroup update
 */
export type RegisteredGroupUpdateArgs = {
  /**
   * Select specific fields to fetch from the RegisteredGroup
  **/
  select?: RegisteredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RegisteredGroupInclude | null
  /**
   * The data needed to update a RegisteredGroup.
  **/
  data: RegisteredGroupUpdateInput
  /**
   * Choose, which RegisteredGroup to update.
  **/
  where: RegisteredGroupWhereUniqueInput
}


/**
 * RegisteredGroup updateMany
 */
export type RegisteredGroupUpdateManyArgs = {
  data: RegisteredGroupUpdateManyMutationInput
  where?: RegisteredGroupWhereInput
}


/**
 * RegisteredGroup upsert
 */
export type RegisteredGroupUpsertArgs = {
  /**
   * Select specific fields to fetch from the RegisteredGroup
  **/
  select?: RegisteredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RegisteredGroupInclude | null
  /**
   * The filter to search for the RegisteredGroup to update in case it exists.
  **/
  where: RegisteredGroupWhereUniqueInput
  /**
   * In case the RegisteredGroup found by the `where` argument doesn't exist, create a new RegisteredGroup with this data.
  **/
  create: RegisteredGroupCreateInput
  /**
   * In case the RegisteredGroup was found with the provided `where` argument, update it with this data.
  **/
  update: RegisteredGroupUpdateInput
}


/**
 * RegisteredGroup delete
 */
export type RegisteredGroupDeleteArgs = {
  /**
   * Select specific fields to fetch from the RegisteredGroup
  **/
  select?: RegisteredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RegisteredGroupInclude | null
  /**
   * Filter which RegisteredGroup to delete.
  **/
  where: RegisteredGroupWhereUniqueInput
}


/**
 * RegisteredGroup deleteMany
 */
export type RegisteredGroupDeleteManyArgs = {
  where?: RegisteredGroupWhereInput
}


/**
 * RegisteredGroup without action
 */
export type RegisteredGroupArgs = {
  /**
   * Select specific fields to fetch from the RegisteredGroup
  **/
  select?: RegisteredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RegisteredGroupInclude | null
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
  orphanId: number | null
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
  orphanId: number | null
}

export type SiblingMinAggregateOutputType = {
  id: number
  age: number
  orphanId: number | null
}

export type SiblingMaxAggregateOutputType = {
  id: number
  age: number
  orphanId: number | null
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
      ? OrphanGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Sibling ? Sibling[P]
: 
      P extends 'orphan'
      ? OrphanGetPayload<S['select'][P]> | null : never
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
 * Model SocialWorker
 */

export type SocialWorker = {
  id: number
  fullName: string
  phoneNumber: string
  email: string
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
}

export type SocialWorkerSumAggregateOutputType = {
  id: number
}

export type SocialWorkerMinAggregateOutputType = {
  id: number
}

export type SocialWorkerMaxAggregateOutputType = {
  id: number
}


export type SocialWorkerAvgAggregateInputType = {
  id?: true
}

export type SocialWorkerSumAggregateInputType = {
  id?: true
}

export type SocialWorkerMinAggregateInputType = {
  id?: true
}

export type SocialWorkerMaxAggregateInputType = {
  id?: true
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
  sponsoredgroup?: boolean | FindManySponsoredGroupArgs
}

export type SocialWorkerInclude = {
  sponsoredgroup?: boolean | FindManySponsoredGroupArgs
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
      P extends 'sponsoredgroup'
      ? Array<SponsoredGroupGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof SocialWorker ? SocialWorker[P]
: 
      P extends 'sponsoredgroup'
      ? Array<SponsoredGroupGetPayload<S['select'][P]>> : never
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

  sponsoredgroup<T extends FindManySponsoredGroupArgs = {}>(args?: Subset<T, FindManySponsoredGroupArgs>): CheckSelect<T, Promise<Array<SponsoredGroup>>, Promise<Array<SponsoredGroupGetPayload<T>>>>;

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
 * Model SponsoredGroup
 */

export type SponsoredGroup = {
  id: number
  sponsorshipDate: Date
  supportId: number | null
  donorId: number | null
  socialWorkerId: number | null
}


export type AggregateSponsoredGroup = {
  count: number
  avg: SponsoredGroupAvgAggregateOutputType | null
  sum: SponsoredGroupSumAggregateOutputType | null
  min: SponsoredGroupMinAggregateOutputType | null
  max: SponsoredGroupMaxAggregateOutputType | null
}

export type SponsoredGroupAvgAggregateOutputType = {
  id: number
  supportId: number
  donorId: number
  socialWorkerId: number
}

export type SponsoredGroupSumAggregateOutputType = {
  id: number
  supportId: number | null
  donorId: number | null
  socialWorkerId: number | null
}

export type SponsoredGroupMinAggregateOutputType = {
  id: number
  supportId: number | null
  donorId: number | null
  socialWorkerId: number | null
}

export type SponsoredGroupMaxAggregateOutputType = {
  id: number
  supportId: number | null
  donorId: number | null
  socialWorkerId: number | null
}


export type SponsoredGroupAvgAggregateInputType = {
  id?: true
  supportId?: true
  donorId?: true
  socialWorkerId?: true
}

export type SponsoredGroupSumAggregateInputType = {
  id?: true
  supportId?: true
  donorId?: true
  socialWorkerId?: true
}

export type SponsoredGroupMinAggregateInputType = {
  id?: true
  supportId?: true
  donorId?: true
  socialWorkerId?: true
}

export type SponsoredGroupMaxAggregateInputType = {
  id?: true
  supportId?: true
  donorId?: true
  socialWorkerId?: true
}

export type AggregateSponsoredGroupArgs = {
  where?: SponsoredGroupWhereInput
  orderBy?: Enumerable<SponsoredGroupOrderByInput>
  cursor?: SponsoredGroupWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SponsoredGroupDistinctFieldEnum>
  count?: true
  avg?: SponsoredGroupAvgAggregateInputType
  sum?: SponsoredGroupSumAggregateInputType
  min?: SponsoredGroupMinAggregateInputType
  max?: SponsoredGroupMaxAggregateInputType
}

export type GetSponsoredGroupAggregateType<T extends AggregateSponsoredGroupArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSponsoredGroupAggregateScalarType<T[P]>
}

export type GetSponsoredGroupAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SponsoredGroupAvgAggregateOutputType ? SponsoredGroupAvgAggregateOutputType[P] : never
}
    
    

export type SponsoredGroupSelect = {
  id?: boolean
  sponsorshipDate?: boolean
  supportId?: boolean
  donorId?: boolean
  socialWorkerId?: boolean
  donor?: boolean | DonorArgs
  socialworkers?: boolean | SocialWorkerArgs
  support?: boolean | SupportArgs
  orphans?: boolean | FindManyOrphanArgs
}

export type SponsoredGroupInclude = {
  donor?: boolean | DonorArgs
  socialworkers?: boolean | SocialWorkerArgs
  support?: boolean | SupportArgs
  orphans?: boolean | FindManyOrphanArgs
}

export type SponsoredGroupGetPayload<
  S extends boolean | null | undefined | SponsoredGroupArgs,
  U = keyof S
> = S extends true
  ? SponsoredGroup
  : S extends undefined
  ? never
  : S extends SponsoredGroupArgs | FindManySponsoredGroupArgs
  ? 'include' extends U
    ? SponsoredGroup  & {
      [P in TrueKeys<S['include']>]:
      P extends 'donor'
      ? DonorGetPayload<S['include'][P]> | null :
      P extends 'socialworkers'
      ? SocialWorkerGetPayload<S['include'][P]> | null :
      P extends 'support'
      ? SupportGetPayload<S['include'][P]> | null :
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof SponsoredGroup ? SponsoredGroup[P]
: 
      P extends 'donor'
      ? DonorGetPayload<S['select'][P]> | null :
      P extends 'socialworkers'
      ? SocialWorkerGetPayload<S['select'][P]> | null :
      P extends 'support'
      ? SupportGetPayload<S['select'][P]> | null :
      P extends 'orphans'
      ? Array<OrphanGetPayload<S['select'][P]>> : never
    }
  : SponsoredGroup
: SponsoredGroup


export interface SponsoredGroupDelegate {
  /**
   * Find zero or one SponsoredGroup.
   * @param {FindOneSponsoredGroupArgs} args - Arguments to find a SponsoredGroup
   * @example
   * // Get one SponsoredGroup
   * const sponsoredGroup = await prisma.sponsoredGroup.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSponsoredGroupArgs>(
    args: Subset<T, FindOneSponsoredGroupArgs>
  ): CheckSelect<T, Prisma__SponsoredGroupClient<SponsoredGroup | null>, Prisma__SponsoredGroupClient<SponsoredGroupGetPayload<T> | null>>
  /**
   * Find zero or more SponsoredGroups.
   * @param {FindManySponsoredGroupArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all SponsoredGroups
   * const sponsoredGroups = await prisma.sponsoredGroup.findMany()
   * 
   * // Get first 10 SponsoredGroups
   * const sponsoredGroups = await prisma.sponsoredGroup.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const sponsoredGroupWithIdOnly = await prisma.sponsoredGroup.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySponsoredGroupArgs>(
    args?: Subset<T, FindManySponsoredGroupArgs>
  ): CheckSelect<T, Promise<Array<SponsoredGroup>>, Promise<Array<SponsoredGroupGetPayload<T>>>>
  /**
   * Create a SponsoredGroup.
   * @param {SponsoredGroupCreateArgs} args - Arguments to create a SponsoredGroup.
   * @example
   * // Create one SponsoredGroup
   * const SponsoredGroup = await prisma.sponsoredGroup.create({
   *   data: {
   *     // ... data to create a SponsoredGroup
   *   }
   * })
   * 
  **/
  create<T extends SponsoredGroupCreateArgs>(
    args: Subset<T, SponsoredGroupCreateArgs>
  ): CheckSelect<T, Prisma__SponsoredGroupClient<SponsoredGroup>, Prisma__SponsoredGroupClient<SponsoredGroupGetPayload<T>>>
  /**
   * Delete a SponsoredGroup.
   * @param {SponsoredGroupDeleteArgs} args - Arguments to delete one SponsoredGroup.
   * @example
   * // Delete one SponsoredGroup
   * const SponsoredGroup = await prisma.sponsoredGroup.delete({
   *   where: {
   *     // ... filter to delete one SponsoredGroup
   *   }
   * })
   * 
  **/
  delete<T extends SponsoredGroupDeleteArgs>(
    args: Subset<T, SponsoredGroupDeleteArgs>
  ): CheckSelect<T, Prisma__SponsoredGroupClient<SponsoredGroup>, Prisma__SponsoredGroupClient<SponsoredGroupGetPayload<T>>>
  /**
   * Update one SponsoredGroup.
   * @param {SponsoredGroupUpdateArgs} args - Arguments to update one SponsoredGroup.
   * @example
   * // Update one SponsoredGroup
   * const sponsoredGroup = await prisma.sponsoredGroup.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SponsoredGroupUpdateArgs>(
    args: Subset<T, SponsoredGroupUpdateArgs>
  ): CheckSelect<T, Prisma__SponsoredGroupClient<SponsoredGroup>, Prisma__SponsoredGroupClient<SponsoredGroupGetPayload<T>>>
  /**
   * Delete zero or more SponsoredGroups.
   * @param {SponsoredGroupDeleteManyArgs} args - Arguments to filter SponsoredGroups to delete.
   * @example
   * // Delete a few SponsoredGroups
   * const { count } = await prisma.sponsoredGroup.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SponsoredGroupDeleteManyArgs>(
    args: Subset<T, SponsoredGroupDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more SponsoredGroups.
   * @param {SponsoredGroupUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many SponsoredGroups
   * const sponsoredGroup = await prisma.sponsoredGroup.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SponsoredGroupUpdateManyArgs>(
    args: Subset<T, SponsoredGroupUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one SponsoredGroup.
   * @param {SponsoredGroupUpsertArgs} args - Arguments to update or create a SponsoredGroup.
   * @example
   * // Update or create a SponsoredGroup
   * const sponsoredGroup = await prisma.sponsoredGroup.upsert({
   *   create: {
   *     // ... data to create a SponsoredGroup
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the SponsoredGroup we want to update
   *   }
   * })
  **/
  upsert<T extends SponsoredGroupUpsertArgs>(
    args: Subset<T, SponsoredGroupUpsertArgs>
  ): CheckSelect<T, Prisma__SponsoredGroupClient<SponsoredGroup>, Prisma__SponsoredGroupClient<SponsoredGroupGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySponsoredGroupArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSponsoredGroupArgs>(args: Subset<T, AggregateSponsoredGroupArgs>): Promise<GetSponsoredGroupAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for SponsoredGroup.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SponsoredGroupClient<T> implements Promise<T> {
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

  socialworkers<T extends SocialWorkerArgs = {}>(args?: Subset<T, SocialWorkerArgs>): CheckSelect<T, Prisma__SocialWorkerClient<SocialWorker | null>, Prisma__SocialWorkerClient<SocialWorkerGetPayload<T> | null>>;

  support<T extends SupportArgs = {}>(args?: Subset<T, SupportArgs>): CheckSelect<T, Prisma__SupportClient<Support | null>, Prisma__SupportClient<SupportGetPayload<T> | null>>;

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
 * SponsoredGroup findOne
 */
export type FindOneSponsoredGroupArgs = {
  /**
   * Select specific fields to fetch from the SponsoredGroup
  **/
  select?: SponsoredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SponsoredGroupInclude | null
  /**
   * Filter, which SponsoredGroup to fetch.
  **/
  where: SponsoredGroupWhereUniqueInput
}


/**
 * SponsoredGroup findMany
 */
export type FindManySponsoredGroupArgs = {
  /**
   * Select specific fields to fetch from the SponsoredGroup
  **/
  select?: SponsoredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SponsoredGroupInclude | null
  /**
   * Filter, which SponsoredGroups to fetch.
  **/
  where?: SponsoredGroupWhereInput
  /**
   * Determine the order of the SponsoredGroups to fetch.
  **/
  orderBy?: Enumerable<SponsoredGroupOrderByInput>
  /**
   * Sets the position for listing SponsoredGroups.
  **/
  cursor?: SponsoredGroupWhereUniqueInput
  /**
   * The number of SponsoredGroups to fetch. If negative number, it will take SponsoredGroups before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` SponsoredGroups.
  **/
  skip?: number
  distinct?: Enumerable<SponsoredGroupDistinctFieldEnum>
}


/**
 * SponsoredGroup create
 */
export type SponsoredGroupCreateArgs = {
  /**
   * Select specific fields to fetch from the SponsoredGroup
  **/
  select?: SponsoredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SponsoredGroupInclude | null
  /**
   * The data needed to create a SponsoredGroup.
  **/
  data: SponsoredGroupCreateInput
}


/**
 * SponsoredGroup update
 */
export type SponsoredGroupUpdateArgs = {
  /**
   * Select specific fields to fetch from the SponsoredGroup
  **/
  select?: SponsoredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SponsoredGroupInclude | null
  /**
   * The data needed to update a SponsoredGroup.
  **/
  data: SponsoredGroupUpdateInput
  /**
   * Choose, which SponsoredGroup to update.
  **/
  where: SponsoredGroupWhereUniqueInput
}


/**
 * SponsoredGroup updateMany
 */
export type SponsoredGroupUpdateManyArgs = {
  data: SponsoredGroupUpdateManyMutationInput
  where?: SponsoredGroupWhereInput
}


/**
 * SponsoredGroup upsert
 */
export type SponsoredGroupUpsertArgs = {
  /**
   * Select specific fields to fetch from the SponsoredGroup
  **/
  select?: SponsoredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SponsoredGroupInclude | null
  /**
   * The filter to search for the SponsoredGroup to update in case it exists.
  **/
  where: SponsoredGroupWhereUniqueInput
  /**
   * In case the SponsoredGroup found by the `where` argument doesn't exist, create a new SponsoredGroup with this data.
  **/
  create: SponsoredGroupCreateInput
  /**
   * In case the SponsoredGroup was found with the provided `where` argument, update it with this data.
  **/
  update: SponsoredGroupUpdateInput
}


/**
 * SponsoredGroup delete
 */
export type SponsoredGroupDeleteArgs = {
  /**
   * Select specific fields to fetch from the SponsoredGroup
  **/
  select?: SponsoredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SponsoredGroupInclude | null
  /**
   * Filter which SponsoredGroup to delete.
  **/
  where: SponsoredGroupWhereUniqueInput
}


/**
 * SponsoredGroup deleteMany
 */
export type SponsoredGroupDeleteManyArgs = {
  where?: SponsoredGroupWhereInput
}


/**
 * SponsoredGroup without action
 */
export type SponsoredGroupArgs = {
  /**
   * Select specific fields to fetch from the SponsoredGroup
  **/
  select?: SponsoredGroupSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SponsoredGroupInclude | null
}



/**
 * Model Support
 */

export type Support = {
  id: number
  status: string | null
  financialId: number | null
  educationalId: number | null
  otherId: number | null
}


export type AggregateSupport = {
  count: number
  avg: SupportAvgAggregateOutputType | null
  sum: SupportSumAggregateOutputType | null
  min: SupportMinAggregateOutputType | null
  max: SupportMaxAggregateOutputType | null
}

export type SupportAvgAggregateOutputType = {
  id: number
  financialId: number
  educationalId: number
  otherId: number
}

export type SupportSumAggregateOutputType = {
  id: number
  financialId: number | null
  educationalId: number | null
  otherId: number | null
}

export type SupportMinAggregateOutputType = {
  id: number
  financialId: number | null
  educationalId: number | null
  otherId: number | null
}

export type SupportMaxAggregateOutputType = {
  id: number
  financialId: number | null
  educationalId: number | null
  otherId: number | null
}


export type SupportAvgAggregateInputType = {
  id?: true
  financialId?: true
  educationalId?: true
  otherId?: true
}

export type SupportSumAggregateInputType = {
  id?: true
  financialId?: true
  educationalId?: true
  otherId?: true
}

export type SupportMinAggregateInputType = {
  id?: true
  financialId?: true
  educationalId?: true
  otherId?: true
}

export type SupportMaxAggregateInputType = {
  id?: true
  financialId?: true
  educationalId?: true
  otherId?: true
}

export type AggregateSupportArgs = {
  where?: SupportWhereInput
  orderBy?: Enumerable<SupportOrderByInput>
  cursor?: SupportWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SupportDistinctFieldEnum>
  count?: true
  avg?: SupportAvgAggregateInputType
  sum?: SupportSumAggregateInputType
  min?: SupportMinAggregateInputType
  max?: SupportMaxAggregateInputType
}

export type GetSupportAggregateType<T extends AggregateSupportArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSupportAggregateScalarType<T[P]>
}

export type GetSupportAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SupportAvgAggregateOutputType ? SupportAvgAggregateOutputType[P] : never
}
    
    

export type SupportSelect = {
  id?: boolean
  status?: boolean
  financialId?: boolean
  educationalId?: boolean
  otherId?: boolean
  educationalsupport?: boolean | EducationalSupportArgs
  financialsupport?: boolean | FinancialSupportArgs
  othersupport?: boolean | OtherSupportArgs
  sponsoredgroup?: boolean | FindManySponsoredGroupArgs
}

export type SupportInclude = {
  educationalsupport?: boolean | EducationalSupportArgs
  financialsupport?: boolean | FinancialSupportArgs
  othersupport?: boolean | OtherSupportArgs
  sponsoredgroup?: boolean | FindManySponsoredGroupArgs
}

export type SupportGetPayload<
  S extends boolean | null | undefined | SupportArgs,
  U = keyof S
> = S extends true
  ? Support
  : S extends undefined
  ? never
  : S extends SupportArgs | FindManySupportArgs
  ? 'include' extends U
    ? Support  & {
      [P in TrueKeys<S['include']>]:
      P extends 'educationalsupport'
      ? EducationalSupportGetPayload<S['include'][P]> | null :
      P extends 'financialsupport'
      ? FinancialSupportGetPayload<S['include'][P]> | null :
      P extends 'othersupport'
      ? OtherSupportGetPayload<S['include'][P]> | null :
      P extends 'sponsoredgroup'
      ? Array<SponsoredGroupGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Support ? Support[P]
: 
      P extends 'educationalsupport'
      ? EducationalSupportGetPayload<S['select'][P]> | null :
      P extends 'financialsupport'
      ? FinancialSupportGetPayload<S['select'][P]> | null :
      P extends 'othersupport'
      ? OtherSupportGetPayload<S['select'][P]> | null :
      P extends 'sponsoredgroup'
      ? Array<SponsoredGroupGetPayload<S['select'][P]>> : never
    }
  : Support
: Support


export interface SupportDelegate {
  /**
   * Find zero or one Support.
   * @param {FindOneSupportArgs} args - Arguments to find a Support
   * @example
   * // Get one Support
   * const support = await prisma.support.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSupportArgs>(
    args: Subset<T, FindOneSupportArgs>
  ): CheckSelect<T, Prisma__SupportClient<Support | null>, Prisma__SupportClient<SupportGetPayload<T> | null>>
  /**
   * Find zero or more Supports.
   * @param {FindManySupportArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Supports
   * const supports = await prisma.support.findMany()
   * 
   * // Get first 10 Supports
   * const supports = await prisma.support.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const supportWithIdOnly = await prisma.support.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySupportArgs>(
    args?: Subset<T, FindManySupportArgs>
  ): CheckSelect<T, Promise<Array<Support>>, Promise<Array<SupportGetPayload<T>>>>
  /**
   * Create a Support.
   * @param {SupportCreateArgs} args - Arguments to create a Support.
   * @example
   * // Create one Support
   * const Support = await prisma.support.create({
   *   data: {
   *     // ... data to create a Support
   *   }
   * })
   * 
  **/
  create<T extends SupportCreateArgs>(
    args: Subset<T, SupportCreateArgs>
  ): CheckSelect<T, Prisma__SupportClient<Support>, Prisma__SupportClient<SupportGetPayload<T>>>
  /**
   * Delete a Support.
   * @param {SupportDeleteArgs} args - Arguments to delete one Support.
   * @example
   * // Delete one Support
   * const Support = await prisma.support.delete({
   *   where: {
   *     // ... filter to delete one Support
   *   }
   * })
   * 
  **/
  delete<T extends SupportDeleteArgs>(
    args: Subset<T, SupportDeleteArgs>
  ): CheckSelect<T, Prisma__SupportClient<Support>, Prisma__SupportClient<SupportGetPayload<T>>>
  /**
   * Update one Support.
   * @param {SupportUpdateArgs} args - Arguments to update one Support.
   * @example
   * // Update one Support
   * const support = await prisma.support.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SupportUpdateArgs>(
    args: Subset<T, SupportUpdateArgs>
  ): CheckSelect<T, Prisma__SupportClient<Support>, Prisma__SupportClient<SupportGetPayload<T>>>
  /**
   * Delete zero or more Supports.
   * @param {SupportDeleteManyArgs} args - Arguments to filter Supports to delete.
   * @example
   * // Delete a few Supports
   * const { count } = await prisma.support.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SupportDeleteManyArgs>(
    args: Subset<T, SupportDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Supports.
   * @param {SupportUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Supports
   * const support = await prisma.support.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SupportUpdateManyArgs>(
    args: Subset<T, SupportUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Support.
   * @param {SupportUpsertArgs} args - Arguments to update or create a Support.
   * @example
   * // Update or create a Support
   * const support = await prisma.support.upsert({
   *   create: {
   *     // ... data to create a Support
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Support we want to update
   *   }
   * })
  **/
  upsert<T extends SupportUpsertArgs>(
    args: Subset<T, SupportUpsertArgs>
  ): CheckSelect<T, Prisma__SupportClient<Support>, Prisma__SupportClient<SupportGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySupportArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSupportArgs>(args: Subset<T, AggregateSupportArgs>): Promise<GetSupportAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Support.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SupportClient<T> implements Promise<T> {
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

  educationalsupport<T extends EducationalSupportArgs = {}>(args?: Subset<T, EducationalSupportArgs>): CheckSelect<T, Prisma__EducationalSupportClient<EducationalSupport | null>, Prisma__EducationalSupportClient<EducationalSupportGetPayload<T> | null>>;

  financialsupport<T extends FinancialSupportArgs = {}>(args?: Subset<T, FinancialSupportArgs>): CheckSelect<T, Prisma__FinancialSupportClient<FinancialSupport | null>, Prisma__FinancialSupportClient<FinancialSupportGetPayload<T> | null>>;

  othersupport<T extends OtherSupportArgs = {}>(args?: Subset<T, OtherSupportArgs>): CheckSelect<T, Prisma__OtherSupportClient<OtherSupport | null>, Prisma__OtherSupportClient<OtherSupportGetPayload<T> | null>>;

  sponsoredgroup<T extends FindManySponsoredGroupArgs = {}>(args?: Subset<T, FindManySponsoredGroupArgs>): CheckSelect<T, Promise<Array<SponsoredGroup>>, Promise<Array<SponsoredGroupGetPayload<T>>>>;

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
 * Support findOne
 */
export type FindOneSupportArgs = {
  /**
   * Select specific fields to fetch from the Support
  **/
  select?: SupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SupportInclude | null
  /**
   * Filter, which Support to fetch.
  **/
  where: SupportWhereUniqueInput
}


/**
 * Support findMany
 */
export type FindManySupportArgs = {
  /**
   * Select specific fields to fetch from the Support
  **/
  select?: SupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SupportInclude | null
  /**
   * Filter, which Supports to fetch.
  **/
  where?: SupportWhereInput
  /**
   * Determine the order of the Supports to fetch.
  **/
  orderBy?: Enumerable<SupportOrderByInput>
  /**
   * Sets the position for listing Supports.
  **/
  cursor?: SupportWhereUniqueInput
  /**
   * The number of Supports to fetch. If negative number, it will take Supports before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Supports.
  **/
  skip?: number
  distinct?: Enumerable<SupportDistinctFieldEnum>
}


/**
 * Support create
 */
export type SupportCreateArgs = {
  /**
   * Select specific fields to fetch from the Support
  **/
  select?: SupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SupportInclude | null
  /**
   * The data needed to create a Support.
  **/
  data: SupportCreateInput
}


/**
 * Support update
 */
export type SupportUpdateArgs = {
  /**
   * Select specific fields to fetch from the Support
  **/
  select?: SupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SupportInclude | null
  /**
   * The data needed to update a Support.
  **/
  data: SupportUpdateInput
  /**
   * Choose, which Support to update.
  **/
  where: SupportWhereUniqueInput
}


/**
 * Support updateMany
 */
export type SupportUpdateManyArgs = {
  data: SupportUpdateManyMutationInput
  where?: SupportWhereInput
}


/**
 * Support upsert
 */
export type SupportUpsertArgs = {
  /**
   * Select specific fields to fetch from the Support
  **/
  select?: SupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SupportInclude | null
  /**
   * The filter to search for the Support to update in case it exists.
  **/
  where: SupportWhereUniqueInput
  /**
   * In case the Support found by the `where` argument doesn't exist, create a new Support with this data.
  **/
  create: SupportCreateInput
  /**
   * In case the Support was found with the provided `where` argument, update it with this data.
  **/
  update: SupportUpdateInput
}


/**
 * Support delete
 */
export type SupportDeleteArgs = {
  /**
   * Select specific fields to fetch from the Support
  **/
  select?: SupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SupportInclude | null
  /**
   * Filter which Support to delete.
  **/
  where: SupportWhereUniqueInput
}


/**
 * Support deleteMany
 */
export type SupportDeleteManyArgs = {
  where?: SupportWhereInput
}


/**
 * Support without action
 */
export type SupportArgs = {
  /**
   * Select specific fields to fetch from the Support
  **/
  select?: SupportSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SupportInclude | null
}



/**
 * Model migration
 */

export type migration = {
  revision: number
  name: string
  datamodel: string
  status: string
  applied: number
  rolled_back: number
  datamodel_steps: string
  database_migration: string
  errors: string
  started_at: Date
  finished_at: Date | null
}


export type AggregateMigration = {
  count: number
  avg: MigrationAvgAggregateOutputType | null
  sum: MigrationSumAggregateOutputType | null
  min: MigrationMinAggregateOutputType | null
  max: MigrationMaxAggregateOutputType | null
}

export type MigrationAvgAggregateOutputType = {
  revision: number
  applied: number
  rolled_back: number
}

export type MigrationSumAggregateOutputType = {
  revision: number
  applied: number
  rolled_back: number
}

export type MigrationMinAggregateOutputType = {
  revision: number
  applied: number
  rolled_back: number
}

export type MigrationMaxAggregateOutputType = {
  revision: number
  applied: number
  rolled_back: number
}


export type MigrationAvgAggregateInputType = {
  revision?: true
  applied?: true
  rolled_back?: true
}

export type MigrationSumAggregateInputType = {
  revision?: true
  applied?: true
  rolled_back?: true
}

export type MigrationMinAggregateInputType = {
  revision?: true
  applied?: true
  rolled_back?: true
}

export type MigrationMaxAggregateInputType = {
  revision?: true
  applied?: true
  rolled_back?: true
}

export type AggregateMigrationArgs = {
  where?: migrationWhereInput
  orderBy?: Enumerable<migrationOrderByInput>
  cursor?: migrationWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MigrationDistinctFieldEnum>
  count?: true
  avg?: MigrationAvgAggregateInputType
  sum?: MigrationSumAggregateInputType
  min?: MigrationMinAggregateInputType
  max?: MigrationMaxAggregateInputType
}

export type GetMigrationAggregateType<T extends AggregateMigrationArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetMigrationAggregateScalarType<T[P]>
}

export type GetMigrationAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof MigrationAvgAggregateOutputType ? MigrationAvgAggregateOutputType[P] : never
}
    
    

export type migrationSelect = {
  revision?: boolean
  name?: boolean
  datamodel?: boolean
  status?: boolean
  applied?: boolean
  rolled_back?: boolean
  datamodel_steps?: boolean
  database_migration?: boolean
  errors?: boolean
  started_at?: boolean
  finished_at?: boolean
}

export type migrationGetPayload<
  S extends boolean | null | undefined | migrationArgs,
  U = keyof S
> = S extends true
  ? migration
  : S extends undefined
  ? never
  : S extends migrationArgs | FindManymigrationArgs
  ? 'include' extends U
    ? migration 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof migration ? migration[P]
: 
 never
    }
  : migration
: migration


export interface migrationDelegate {
  /**
   * Find zero or one Migration.
   * @param {FindOnemigrationArgs} args - Arguments to find a Migration
   * @example
   * // Get one Migration
   * const migration = await prisma.migration.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnemigrationArgs>(
    args: Subset<T, FindOnemigrationArgs>
  ): CheckSelect<T, Prisma__migrationClient<migration | null>, Prisma__migrationClient<migrationGetPayload<T> | null>>
  /**
   * Find zero or more Migrations.
   * @param {FindManymigrationArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Migrations
   * const migrations = await prisma.migration.findMany()
   * 
   * // Get first 10 Migrations
   * const migrations = await prisma.migration.findMany({ take: 10 })
   * 
   * // Only select the `revision`
   * const migrationWithRevisionOnly = await prisma.migration.findMany({ select: { revision: true } })
   * 
  **/
  findMany<T extends FindManymigrationArgs>(
    args?: Subset<T, FindManymigrationArgs>
  ): CheckSelect<T, Promise<Array<migration>>, Promise<Array<migrationGetPayload<T>>>>
  /**
   * Create a Migration.
   * @param {migrationCreateArgs} args - Arguments to create a Migration.
   * @example
   * // Create one Migration
   * const Migration = await prisma.migration.create({
   *   data: {
   *     // ... data to create a Migration
   *   }
   * })
   * 
  **/
  create<T extends migrationCreateArgs>(
    args: Subset<T, migrationCreateArgs>
  ): CheckSelect<T, Prisma__migrationClient<migration>, Prisma__migrationClient<migrationGetPayload<T>>>
  /**
   * Delete a Migration.
   * @param {migrationDeleteArgs} args - Arguments to delete one Migration.
   * @example
   * // Delete one Migration
   * const Migration = await prisma.migration.delete({
   *   where: {
   *     // ... filter to delete one Migration
   *   }
   * })
   * 
  **/
  delete<T extends migrationDeleteArgs>(
    args: Subset<T, migrationDeleteArgs>
  ): CheckSelect<T, Prisma__migrationClient<migration>, Prisma__migrationClient<migrationGetPayload<T>>>
  /**
   * Update one Migration.
   * @param {migrationUpdateArgs} args - Arguments to update one Migration.
   * @example
   * // Update one Migration
   * const migration = await prisma.migration.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends migrationUpdateArgs>(
    args: Subset<T, migrationUpdateArgs>
  ): CheckSelect<T, Prisma__migrationClient<migration>, Prisma__migrationClient<migrationGetPayload<T>>>
  /**
   * Delete zero or more Migrations.
   * @param {migrationDeleteManyArgs} args - Arguments to filter Migrations to delete.
   * @example
   * // Delete a few Migrations
   * const { count } = await prisma.migration.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends migrationDeleteManyArgs>(
    args: Subset<T, migrationDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Migrations.
   * @param {migrationUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Migrations
   * const migration = await prisma.migration.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends migrationUpdateManyArgs>(
    args: Subset<T, migrationUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Migration.
   * @param {migrationUpsertArgs} args - Arguments to update or create a Migration.
   * @example
   * // Update or create a Migration
   * const migration = await prisma.migration.upsert({
   *   create: {
   *     // ... data to create a Migration
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Migration we want to update
   *   }
   * })
  **/
  upsert<T extends migrationUpsertArgs>(
    args: Subset<T, migrationUpsertArgs>
  ): CheckSelect<T, Prisma__migrationClient<migration>, Prisma__migrationClient<migrationGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManymigrationArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMigrationArgs>(args: Subset<T, AggregateMigrationArgs>): Promise<GetMigrationAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for migration.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__migrationClient<T> implements Promise<T> {
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
 * migration findOne
 */
export type FindOnemigrationArgs = {
  /**
   * Select specific fields to fetch from the migration
  **/
  select?: migrationSelect | null
  /**
   * Filter, which migration to fetch.
  **/
  where: migrationWhereUniqueInput
}


/**
 * migration findMany
 */
export type FindManymigrationArgs = {
  /**
   * Select specific fields to fetch from the migration
  **/
  select?: migrationSelect | null
  /**
   * Filter, which migrations to fetch.
  **/
  where?: migrationWhereInput
  /**
   * Determine the order of the migrations to fetch.
  **/
  orderBy?: Enumerable<migrationOrderByInput>
  /**
   * Sets the position for listing migrations.
  **/
  cursor?: migrationWhereUniqueInput
  /**
   * The number of migrations to fetch. If negative number, it will take migrations before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` migrations.
  **/
  skip?: number
  distinct?: Enumerable<MigrationDistinctFieldEnum>
}


/**
 * migration create
 */
export type migrationCreateArgs = {
  /**
   * Select specific fields to fetch from the migration
  **/
  select?: migrationSelect | null
  /**
   * The data needed to create a migration.
  **/
  data: migrationCreateInput
}


/**
 * migration update
 */
export type migrationUpdateArgs = {
  /**
   * Select specific fields to fetch from the migration
  **/
  select?: migrationSelect | null
  /**
   * The data needed to update a migration.
  **/
  data: migrationUpdateInput
  /**
   * Choose, which migration to update.
  **/
  where: migrationWhereUniqueInput
}


/**
 * migration updateMany
 */
export type migrationUpdateManyArgs = {
  data: migrationUpdateManyMutationInput
  where?: migrationWhereInput
}


/**
 * migration upsert
 */
export type migrationUpsertArgs = {
  /**
   * Select specific fields to fetch from the migration
  **/
  select?: migrationSelect | null
  /**
   * The filter to search for the migration to update in case it exists.
  **/
  where: migrationWhereUniqueInput
  /**
   * In case the migration found by the `where` argument doesn't exist, create a new migration with this data.
  **/
  create: migrationCreateInput
  /**
   * In case the migration was found with the provided `where` argument, update it with this data.
  **/
  update: migrationUpdateInput
}


/**
 * migration delete
 */
export type migrationDeleteArgs = {
  /**
   * Select specific fields to fetch from the migration
  **/
  select?: migrationSelect | null
  /**
   * Filter which migration to delete.
  **/
  where: migrationWhereUniqueInput
}


/**
 * migration deleteMany
 */
export type migrationDeleteManyArgs = {
  where?: migrationWhereInput
}


/**
 * migration without action
 */
export type migrationArgs = {
  /**
   * Select specific fields to fetch from the migration
  **/
  select?: migrationSelect | null
}



/**
 * Deep Input Types
 */


export type DonorWhereInput = {
  AND?: Enumerable<DonorWhereInput>
  OR?: Array<DonorWhereInput>
  NOT?: Enumerable<DonorWhereInput>
  id?: number | IntFilter
  companyName?: string | StringFilter
  initialReportPreparationDate?: Date | string | DateTimeNullableFilter | null
  finalReportPreparationDate?: Date | string | DateTimeNullableFilter | null
  initialDataCollectionDate?: Date | string | DateTimeNullableFilter | null
  finalDataCollectionDate?: Date | string | DateTimeNullableFilter | null
  reportDueDate?: Date | string | DateTimeNullableFilter | null
  sponsoredgroups?: SponsoredGroupListRelationFilter
}

export type DonorOrderByInput = {
  id?: SortOrder
  companyName?: SortOrder
  initialReportPreparationDate?: SortOrder
  finalReportPreparationDate?: SortOrder
  initialDataCollectionDate?: SortOrder
  finalDataCollectionDate?: SortOrder
  reportDueDate?: SortOrder
}

export type DonorWhereUniqueInput = {
  id?: number
}

export type EducationWhereInput = {
  AND?: Enumerable<EducationWhereInput>
  OR?: Array<EducationWhereInput>
  NOT?: Enumerable<EducationWhereInput>
  id?: number | IntFilter
  enrollmentStatus?: education_enrollmentStatus | Enumeducation_enrollmentStatusFilter
  schoolName?: string | StringNullableFilter | null
  typeOfSchool?: education_typeOfSchool | Enumeducation_typeOfSchoolNullableFilter | null
  grade?: string | StringNullableFilter | null
  reason?: string | StringNullableFilter | null
  hobbies?: string | StringNullableFilter | null
  orphan?: OrphanWhereInput | null
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

export type EducationalSupportWhereInput = {
  AND?: Enumerable<EducationalSupportWhereInput>
  OR?: Array<EducationalSupportWhereInput>
  NOT?: Enumerable<EducationalSupportWhereInput>
  id?: number | IntFilter
  support?: SupportListRelationFilter
}

export type EducationalSupportOrderByInput = {
  id?: SortOrder
}

export type EducationalSupportWhereUniqueInput = {
  id?: number
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

export type FinancialSupportWhereInput = {
  AND?: Enumerable<FinancialSupportWhereInput>
  OR?: Array<FinancialSupportWhereInput>
  NOT?: Enumerable<FinancialSupportWhereInput>
  id?: number | IntFilter
  support?: SupportListRelationFilter
}

export type FinancialSupportOrderByInput = {
  id?: SortOrder
}

export type FinancialSupportWhereUniqueInput = {
  id?: number
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

export type Iga_propertyWhereInput = {
  AND?: Enumerable<Iga_propertyWhereInput>
  OR?: Array<Iga_propertyWhereInput>
  NOT?: Enumerable<Iga_propertyWhereInput>
  id?: number | IntFilter
  ownershipStatus?: string | StringFilter
  otherProperty?: string | StringNullableFilter | null
  orphan?: OrphanListRelationFilter
}

export type Iga_propertyOrderByInput = {
  id?: SortOrder
  ownershipStatus?: SortOrder
  otherProperty?: SortOrder
}

export type Iga_propertyWhereUniqueInput = {
  id?: number
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
  phoneNumber?: string | StringFilter
  jobId?: number | IntNullableFilter | null
  maritalStatus?: string | StringFilter
  vitalStatus?: string | StringFilter
  monthlyExpense?: number | FloatFilter
  motherjob?: MotherJobWhereInput | null
  orphans?: OrphanListRelationFilter
}

export type MotherOrderByInput = {
  id?: SortOrder
  firstName?: SortOrder
  middleName?: SortOrder
  lastName?: SortOrder
  dateOfBirth?: SortOrder
  phoneNumber?: SortOrder
  jobId?: SortOrder
  maritalStatus?: SortOrder
  vitalStatus?: SortOrder
  monthlyExpense?: SortOrder
}

export type MotherWhereUniqueInput = {
  id?: number
  jobId?: number | null
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

export type MotherJobOrderByInput = {
  id?: SortOrder
  currentJobTitle?: SortOrder
  monthlyIncome?: SortOrder
}

export type MotherJobWhereUniqueInput = {
  id?: number
}

export type OfficialDocumentsWhereInput = {
  AND?: Enumerable<OfficialDocumentsWhereInput>
  OR?: Array<OfficialDocumentsWhereInput>
  NOT?: Enumerable<OfficialDocumentsWhereInput>
  id?: number | IntFilter
  photoPortraitUrl?: string | StringFilter
  photoLongUrl?: string | StringFilter
  fatherDeathCertificateUrl?: string | StringFilter
  birthCertificateUrl?: string | StringFilter
  guardianIDCardUrl?: string | StringFilter
  guardianConfirmationLetterUrl?: string | StringFilter
  orphan?: OrphanWhereInput | null
}

export type OfficialDocumentsOrderByInput = {
  id?: SortOrder
  photoPortraitUrl?: SortOrder
  photoLongUrl?: SortOrder
  fatherDeathCertificateUrl?: SortOrder
  birthCertificateUrl?: SortOrder
  guardianIDCardUrl?: SortOrder
  guardianConfirmationLetterUrl?: SortOrder
}

export type OfficialDocumentsWhereUniqueInput = {
  id?: number
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
  gender?: orphan_gender | Enumorphan_genderFilter
  placeOfBirth?: string | StringFilter
  dateOfBirth?: Date | string | DateTimeFilter
  numberOfSponserdSiblings?: number | IntFilter
  physicalHealthStatus?: string | StringFilter
  psychologicalHealthStatus?: string | StringFilter
  otherHealthIssues?: string | StringFilter
  fatherId?: number | IntNullableFilter | null
  motherId?: number | IntNullableFilter | null
  guardianId?: number | IntNullableFilter | null
  IGA_PropertyId?: number | IntNullableFilter | null
  educationId?: number | IntNullableFilter | null
  docsId?: number | IntNullableFilter | null
  regGroupId?: number | IntNullableFilter | null
  sponsrGroupId?: number | IntNullableFilter | null
  iga_property?: Iga_propertyWhereInput | null
  officialdocuments?: OfficialDocumentsWhereInput | null
  education?: EducationWhereInput | null
  father?: FatherWhereInput | null
  guardian?: GuardianWhereInput | null
  mother?: MotherWhereInput | null
  registeredgroup?: RegisteredGroupWhereInput | null
  sponsoredgroup?: SponsoredGroupWhereInput | null
  siblings?: SiblingListRelationFilter
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
  fatherId?: SortOrder
  motherId?: SortOrder
  guardianId?: SortOrder
  IGA_PropertyId?: SortOrder
  educationId?: SortOrder
  docsId?: SortOrder
  regGroupId?: SortOrder
  sponsrGroupId?: SortOrder
}

export type OrphanWhereUniqueInput = {
  id?: number
  fatherId?: number | null
  motherId?: number | null
  guardianId?: number | null
  IGA_PropertyId?: number | null
  educationId?: number | null
  docsId?: number | null
  regGroupId?: number | null
  sponsrGroupId?: number | null
}

export type OtherSupportWhereInput = {
  AND?: Enumerable<OtherSupportWhereInput>
  OR?: Array<OtherSupportWhereInput>
  NOT?: Enumerable<OtherSupportWhereInput>
  id?: number | IntFilter
  support?: SupportListRelationFilter
}

export type OtherSupportOrderByInput = {
  id?: SortOrder
}

export type OtherSupportWhereUniqueInput = {
  id?: number
}

export type RegisteredGroupWhereInput = {
  AND?: Enumerable<RegisteredGroupWhereInput>
  OR?: Array<RegisteredGroupWhereInput>
  NOT?: Enumerable<RegisteredGroupWhereInput>
  id?: number | IntFilter
  registrationDate?: Date | string | DateTimeFilter
  siteName?: string | StringFilter
  state?: string | StringFilter
  zone?: string | StringFilter
  district?: string | StringFilter
  kebele?: string | StringFilter
  orphans?: OrphanListRelationFilter
}

export type RegisteredGroupOrderByInput = {
  id?: SortOrder
  registrationDate?: SortOrder
  siteName?: SortOrder
  state?: SortOrder
  zone?: SortOrder
  district?: SortOrder
  kebele?: SortOrder
}

export type RegisteredGroupWhereUniqueInput = {
  id?: number
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
  orphanId?: number | IntNullableFilter | null
  orphan?: OrphanWhereInput | null
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
  orphanId?: number | null
}

export type SocialWorkerWhereInput = {
  AND?: Enumerable<SocialWorkerWhereInput>
  OR?: Array<SocialWorkerWhereInput>
  NOT?: Enumerable<SocialWorkerWhereInput>
  id?: number | IntFilter
  fullName?: string | StringFilter
  phoneNumber?: string | StringFilter
  email?: string | StringFilter
  sponsoredgroup?: SponsoredGroupListRelationFilter
}

export type SocialWorkerOrderByInput = {
  id?: SortOrder
  fullName?: SortOrder
  phoneNumber?: SortOrder
  email?: SortOrder
}

export type SocialWorkerWhereUniqueInput = {
  id?: number
}

export type SponsoredGroupWhereInput = {
  AND?: Enumerable<SponsoredGroupWhereInput>
  OR?: Array<SponsoredGroupWhereInput>
  NOT?: Enumerable<SponsoredGroupWhereInput>
  id?: number | IntFilter
  sponsorshipDate?: Date | string | DateTimeFilter
  supportId?: number | IntNullableFilter | null
  donorId?: number | IntNullableFilter | null
  socialWorkerId?: number | IntNullableFilter | null
  donor?: DonorWhereInput | null
  socialworkers?: SocialWorkerWhereInput | null
  support?: SupportWhereInput | null
  orphans?: OrphanListRelationFilter
}

export type SponsoredGroupOrderByInput = {
  id?: SortOrder
  sponsorshipDate?: SortOrder
  supportId?: SortOrder
  donorId?: SortOrder
  socialWorkerId?: SortOrder
}

export type SponsoredGroupWhereUniqueInput = {
  id?: number
  supportId?: number | null
  donorId?: number | null
  socialWorkerId?: number | null
}

export type SupportWhereInput = {
  AND?: Enumerable<SupportWhereInput>
  OR?: Array<SupportWhereInput>
  NOT?: Enumerable<SupportWhereInput>
  id?: number | IntFilter
  status?: string | StringNullableFilter | null
  financialId?: number | IntNullableFilter | null
  educationalId?: number | IntNullableFilter | null
  otherId?: number | IntNullableFilter | null
  educationalsupport?: EducationalSupportWhereInput | null
  financialsupport?: FinancialSupportWhereInput | null
  othersupport?: OtherSupportWhereInput | null
  sponsoredgroup?: SponsoredGroupListRelationFilter
}

export type SupportOrderByInput = {
  id?: SortOrder
  status?: SortOrder
  financialId?: SortOrder
  educationalId?: SortOrder
  otherId?: SortOrder
}

export type SupportWhereUniqueInput = {
  id?: number
  financialId?: number | null
  educationalId?: number | null
  otherId?: number | null
}

export type migrationWhereInput = {
  AND?: Enumerable<migrationWhereInput>
  OR?: Array<migrationWhereInput>
  NOT?: Enumerable<migrationWhereInput>
  revision?: number | IntFilter
  name?: string | StringFilter
  datamodel?: string | StringFilter
  status?: string | StringFilter
  applied?: number | IntFilter
  rolled_back?: number | IntFilter
  datamodel_steps?: string | StringFilter
  database_migration?: string | StringFilter
  errors?: string | StringFilter
  started_at?: Date | string | DateTimeFilter
  finished_at?: Date | string | DateTimeNullableFilter | null
}

export type migrationOrderByInput = {
  revision?: SortOrder
  name?: SortOrder
  datamodel?: SortOrder
  status?: SortOrder
  applied?: SortOrder
  rolled_back?: SortOrder
  datamodel_steps?: SortOrder
  database_migration?: SortOrder
  errors?: SortOrder
  started_at?: SortOrder
  finished_at?: SortOrder
}

export type migrationWhereUniqueInput = {
  revision?: number
}

export type DonorCreateInput = {
  companyName: string
  initialReportPreparationDate?: Date | string | null
  finalReportPreparationDate?: Date | string | null
  initialDataCollectionDate?: Date | string | null
  finalDataCollectionDate?: Date | string | null
  reportDueDate?: Date | string | null
  sponsoredgroups?: SponsoredGroupCreateManyWithoutDonorInput
}

export type DonorUpdateInput = {
  companyName?: string | StringFieldUpdateOperationsInput
  initialReportPreparationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  finalReportPreparationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  initialDataCollectionDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  finalDataCollectionDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  reportDueDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  sponsoredgroups?: SponsoredGroupUpdateManyWithoutDonorInput
}

export type DonorUpdateManyMutationInput = {
  companyName?: string | StringFieldUpdateOperationsInput
  initialReportPreparationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  finalReportPreparationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  initialDataCollectionDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  finalDataCollectionDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  reportDueDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type EducationCreateInput = {
  enrollmentStatus: education_enrollmentStatus
  schoolName?: string | null
  typeOfSchool?: education_typeOfSchool | null
  grade?: string | null
  reason?: string | null
  hobbies?: string | null
  orphan?: OrphanCreateOneWithoutEducationInput
}

export type EducationUpdateInput = {
  enrollmentStatus?: education_enrollmentStatus | Enumeducation_enrollmentStatusFieldUpdateOperationsInput
  schoolName?: string | NullableStringFieldUpdateOperationsInput | null
  typeOfSchool?: education_typeOfSchool | NullableEnumeducation_typeOfSchoolFieldUpdateOperationsInput | null
  grade?: string | NullableStringFieldUpdateOperationsInput | null
  reason?: string | NullableStringFieldUpdateOperationsInput | null
  hobbies?: string | NullableStringFieldUpdateOperationsInput | null
  orphan?: OrphanUpdateOneRequiredWithoutEducationInput
}

export type EducationUpdateManyMutationInput = {
  enrollmentStatus?: education_enrollmentStatus | Enumeducation_enrollmentStatusFieldUpdateOperationsInput
  schoolName?: string | NullableStringFieldUpdateOperationsInput | null
  typeOfSchool?: education_typeOfSchool | NullableEnumeducation_typeOfSchoolFieldUpdateOperationsInput | null
  grade?: string | NullableStringFieldUpdateOperationsInput | null
  reason?: string | NullableStringFieldUpdateOperationsInput | null
  hobbies?: string | NullableStringFieldUpdateOperationsInput | null
}

export type EducationalSupportCreateInput = {
  support?: SupportCreateManyWithoutEducationalsupportInput
}

export type EducationalSupportUpdateInput = {
  support?: SupportUpdateManyWithoutEducationalsupportInput
}

export type EducationalSupportUpdateManyMutationInput = {

}

export type FatherCreateInput = {
  dateOfDeath: Date | string
  causeOfDeath: string
  job?: string | null
  monthlyIncome: number
  dateOfBirth: Date | string
  orphans?: OrphanCreateManyWithoutFatherInput
}

export type FatherUpdateInput = {
  dateOfDeath?: Date | string | DateTimeFieldUpdateOperationsInput
  causeOfDeath?: string | StringFieldUpdateOperationsInput
  job?: string | NullableStringFieldUpdateOperationsInput | null
  monthlyIncome?: number | IntFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  orphans?: OrphanUpdateManyWithoutFatherInput
}

export type FatherUpdateManyMutationInput = {
  dateOfDeath?: Date | string | DateTimeFieldUpdateOperationsInput
  causeOfDeath?: string | StringFieldUpdateOperationsInput
  job?: string | NullableStringFieldUpdateOperationsInput | null
  monthlyIncome?: number | IntFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type FinancialSupportCreateInput = {
  support?: SupportCreateManyWithoutFinancialsupportInput
}

export type FinancialSupportUpdateInput = {
  support?: SupportUpdateManyWithoutFinancialsupportInput
}

export type FinancialSupportUpdateManyMutationInput = {

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

export type GuardianUpdateInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  middleName?: string | StringFieldUpdateOperationsInput
  lastName?: string | StringFieldUpdateOperationsInput
  gender?: string | StringFieldUpdateOperationsInput
  nationality?: string | StringFieldUpdateOperationsInput
  state?: string | StringFieldUpdateOperationsInput
  zone?: string | StringFieldUpdateOperationsInput
  district?: string | StringFieldUpdateOperationsInput
  kebele?: string | StringFieldUpdateOperationsInput
  relationToOrphan?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  job?: string | NullableStringFieldUpdateOperationsInput | null
  age?: number | IntFieldUpdateOperationsInput
  orphans?: OrphanUpdateManyWithoutGuardianInput
}

export type GuardianUpdateManyMutationInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  middleName?: string | StringFieldUpdateOperationsInput
  lastName?: string | StringFieldUpdateOperationsInput
  gender?: string | StringFieldUpdateOperationsInput
  nationality?: string | StringFieldUpdateOperationsInput
  state?: string | StringFieldUpdateOperationsInput
  zone?: string | StringFieldUpdateOperationsInput
  district?: string | StringFieldUpdateOperationsInput
  kebele?: string | StringFieldUpdateOperationsInput
  relationToOrphan?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  job?: string | NullableStringFieldUpdateOperationsInput | null
  age?: number | IntFieldUpdateOperationsInput
}

export type Iga_propertyCreateInput = {
  ownershipStatus: string
  otherProperty?: string | null
  orphan?: OrphanCreateManyWithoutIga_propertyInput
}

export type Iga_propertyUpdateInput = {
  ownershipStatus?: string | StringFieldUpdateOperationsInput
  otherProperty?: string | NullableStringFieldUpdateOperationsInput | null
  orphan?: OrphanUpdateManyWithoutIga_propertyInput
}

export type Iga_propertyUpdateManyMutationInput = {
  ownershipStatus?: string | StringFieldUpdateOperationsInput
  otherProperty?: string | NullableStringFieldUpdateOperationsInput | null
}

export type MotherCreateInput = {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: Date | string
  phoneNumber: string
  maritalStatus: string
  vitalStatus: string
  monthlyExpense: number
  motherjob?: MotherJobCreateOneWithoutMotherInput
  orphans?: OrphanCreateManyWithoutMotherInput
}

export type MotherUpdateInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  middleName?: string | StringFieldUpdateOperationsInput
  lastName?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  phoneNumber?: string | StringFieldUpdateOperationsInput
  maritalStatus?: string | StringFieldUpdateOperationsInput
  vitalStatus?: string | StringFieldUpdateOperationsInput
  monthlyExpense?: number | FloatFieldUpdateOperationsInput
  motherjob?: MotherJobUpdateOneWithoutMotherInput
  orphans?: OrphanUpdateManyWithoutMotherInput
}

export type MotherUpdateManyMutationInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  middleName?: string | StringFieldUpdateOperationsInput
  lastName?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  phoneNumber?: string | StringFieldUpdateOperationsInput
  maritalStatus?: string | StringFieldUpdateOperationsInput
  vitalStatus?: string | StringFieldUpdateOperationsInput
  monthlyExpense?: number | FloatFieldUpdateOperationsInput
}

export type MotherJobCreateInput = {
  currentJobTitle?: string | null
  monthlyIncome?: number | null
  mother?: MotherCreateOneWithoutMotherjobInput
}

export type MotherJobUpdateInput = {
  currentJobTitle?: string | NullableStringFieldUpdateOperationsInput | null
  monthlyIncome?: number | NullableFloatFieldUpdateOperationsInput | null
  mother?: MotherUpdateOneRequiredWithoutMotherjobInput
}

export type MotherJobUpdateManyMutationInput = {
  currentJobTitle?: string | NullableStringFieldUpdateOperationsInput | null
  monthlyIncome?: number | NullableFloatFieldUpdateOperationsInput | null
}

export type OfficialDocumentsCreateInput = {
  photoPortraitUrl: string
  photoLongUrl: string
  fatherDeathCertificateUrl: string
  birthCertificateUrl: string
  guardianIDCardUrl: string
  guardianConfirmationLetterUrl: string
  orphan?: OrphanCreateOneWithoutOfficialdocumentsInput
}

export type OfficialDocumentsUpdateInput = {
  photoPortraitUrl?: string | StringFieldUpdateOperationsInput
  photoLongUrl?: string | StringFieldUpdateOperationsInput
  fatherDeathCertificateUrl?: string | StringFieldUpdateOperationsInput
  birthCertificateUrl?: string | StringFieldUpdateOperationsInput
  guardianIDCardUrl?: string | StringFieldUpdateOperationsInput
  guardianConfirmationLetterUrl?: string | StringFieldUpdateOperationsInput
  orphan?: OrphanUpdateOneRequiredWithoutOfficialdocumentsInput
}

export type OfficialDocumentsUpdateManyMutationInput = {
  photoPortraitUrl?: string | StringFieldUpdateOperationsInput
  photoLongUrl?: string | StringFieldUpdateOperationsInput
  fatherDeathCertificateUrl?: string | StringFieldUpdateOperationsInput
  birthCertificateUrl?: string | StringFieldUpdateOperationsInput
  guardianIDCardUrl?: string | StringFieldUpdateOperationsInput
  guardianConfirmationLetterUrl?: string | StringFieldUpdateOperationsInput
}

export type OrphanCreateInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
}

export type OrphanUpdateInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type OrphanUpdateManyMutationInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
}

export type OtherSupportCreateInput = {
  support?: SupportCreateManyWithoutOthersupportInput
}

export type OtherSupportUpdateInput = {
  support?: SupportUpdateManyWithoutOthersupportInput
}

export type OtherSupportUpdateManyMutationInput = {

}

export type RegisteredGroupCreateInput = {
  registrationDate: Date | string
  siteName: string
  state: string
  zone: string
  district: string
  kebele: string
  orphans?: OrphanCreateManyWithoutRegisteredgroupInput
}

export type RegisteredGroupUpdateInput = {
  registrationDate?: Date | string | DateTimeFieldUpdateOperationsInput
  siteName?: string | StringFieldUpdateOperationsInput
  state?: string | StringFieldUpdateOperationsInput
  zone?: string | StringFieldUpdateOperationsInput
  district?: string | StringFieldUpdateOperationsInput
  kebele?: string | StringFieldUpdateOperationsInput
  orphans?: OrphanUpdateManyWithoutRegisteredgroupInput
}

export type RegisteredGroupUpdateManyMutationInput = {
  registrationDate?: Date | string | DateTimeFieldUpdateOperationsInput
  siteName?: string | StringFieldUpdateOperationsInput
  state?: string | StringFieldUpdateOperationsInput
  zone?: string | StringFieldUpdateOperationsInput
  district?: string | StringFieldUpdateOperationsInput
  kebele?: string | StringFieldUpdateOperationsInput
}

export type SiblingCreateInput = {
  fullName: string
  gender: string
  age: number
  schoolGrade?: string | null
  job?: string | null
  maritalStatus: string
  orphan?: OrphanCreateOneWithoutSiblingsInput
}

export type SiblingUpdateInput = {
  fullName?: string | StringFieldUpdateOperationsInput
  gender?: string | StringFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  schoolGrade?: string | NullableStringFieldUpdateOperationsInput | null
  job?: string | NullableStringFieldUpdateOperationsInput | null
  maritalStatus?: string | StringFieldUpdateOperationsInput
  orphan?: OrphanUpdateOneWithoutSiblingsInput
}

export type SiblingUpdateManyMutationInput = {
  fullName?: string | StringFieldUpdateOperationsInput
  gender?: string | StringFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  schoolGrade?: string | NullableStringFieldUpdateOperationsInput | null
  job?: string | NullableStringFieldUpdateOperationsInput | null
  maritalStatus?: string | StringFieldUpdateOperationsInput
}

export type SocialWorkerCreateInput = {
  fullName: string
  phoneNumber: string
  email: string
  sponsoredgroup?: SponsoredGroupCreateManyWithoutSocialworkersInput
}

export type SocialWorkerUpdateInput = {
  fullName?: string | StringFieldUpdateOperationsInput
  phoneNumber?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  sponsoredgroup?: SponsoredGroupUpdateManyWithoutSocialworkersInput
}

export type SocialWorkerUpdateManyMutationInput = {
  fullName?: string | StringFieldUpdateOperationsInput
  phoneNumber?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
}

export type SponsoredGroupCreateInput = {
  sponsorshipDate: Date | string
  donor?: DonorCreateOneWithoutSponsoredgroupsInput
  socialworkers?: SocialWorkerCreateOneWithoutSponsoredgroupInput
  support?: SupportCreateOneWithoutSponsoredgroupInput
  orphans?: OrphanCreateManyWithoutSponsoredgroupInput
}

export type SponsoredGroupUpdateInput = {
  sponsorshipDate?: Date | string | DateTimeFieldUpdateOperationsInput
  donor?: DonorUpdateOneWithoutSponsoredgroupsInput
  socialworkers?: SocialWorkerUpdateOneWithoutSponsoredgroupInput
  support?: SupportUpdateOneWithoutSponsoredgroupInput
  orphans?: OrphanUpdateManyWithoutSponsoredgroupInput
}

export type SponsoredGroupUpdateManyMutationInput = {
  sponsorshipDate?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type SupportCreateInput = {
  status?: string | null
  educationalsupport?: EducationalSupportCreateOneWithoutSupportInput
  financialsupport?: FinancialSupportCreateOneWithoutSupportInput
  othersupport?: OtherSupportCreateOneWithoutSupportInput
  sponsoredgroup?: SponsoredGroupCreateManyWithoutSupportInput
}

export type SupportUpdateInput = {
  status?: string | NullableStringFieldUpdateOperationsInput | null
  educationalsupport?: EducationalSupportUpdateOneWithoutSupportInput
  financialsupport?: FinancialSupportUpdateOneWithoutSupportInput
  othersupport?: OtherSupportUpdateOneWithoutSupportInput
  sponsoredgroup?: SponsoredGroupUpdateManyWithoutSupportInput
}

export type SupportUpdateManyMutationInput = {
  status?: string | NullableStringFieldUpdateOperationsInput | null
}

export type migrationCreateInput = {
  name: string
  datamodel: string
  status: string
  applied: number
  rolled_back: number
  datamodel_steps: string
  database_migration: string
  errors: string
  started_at: Date | string
  finished_at?: Date | string | null
}

export type migrationUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  datamodel?: string | StringFieldUpdateOperationsInput
  status?: string | StringFieldUpdateOperationsInput
  applied?: number | IntFieldUpdateOperationsInput
  rolled_back?: number | IntFieldUpdateOperationsInput
  datamodel_steps?: string | StringFieldUpdateOperationsInput
  database_migration?: string | StringFieldUpdateOperationsInput
  errors?: string | StringFieldUpdateOperationsInput
  started_at?: Date | string | DateTimeFieldUpdateOperationsInput
  finished_at?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type migrationUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  datamodel?: string | StringFieldUpdateOperationsInput
  status?: string | StringFieldUpdateOperationsInput
  applied?: number | IntFieldUpdateOperationsInput
  rolled_back?: number | IntFieldUpdateOperationsInput
  datamodel_steps?: string | StringFieldUpdateOperationsInput
  database_migration?: string | StringFieldUpdateOperationsInput
  errors?: string | StringFieldUpdateOperationsInput
  started_at?: Date | string | DateTimeFieldUpdateOperationsInput
  finished_at?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
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

export type SponsoredGroupListRelationFilter = {
  every?: SponsoredGroupWhereInput
  some?: SponsoredGroupWhereInput
  none?: SponsoredGroupWhereInput
}

export type Enumeducation_enrollmentStatusFilter = {
  equals?: education_enrollmentStatus
  in?: Enumerable<education_enrollmentStatus>
  notIn?: Enumerable<education_enrollmentStatus>
  not?: education_enrollmentStatus | NestedEnumeducation_enrollmentStatusFilter
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

export type Enumeducation_typeOfSchoolNullableFilter = {
  equals?: education_typeOfSchool | null
  in?: Enumerable<education_typeOfSchool> | null
  notIn?: Enumerable<education_typeOfSchool> | null
  not?: education_typeOfSchool | NestedEnumeducation_typeOfSchoolNullableFilter | null
}

export type OrphanRelationFilter = {
  is?: OrphanWhereInput | null
  isNot?: OrphanWhereInput | null
}

export type SupportListRelationFilter = {
  every?: SupportWhereInput
  some?: SupportWhereInput
  none?: SupportWhereInput
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

export type OrphanListRelationFilter = {
  every?: OrphanWhereInput
  some?: OrphanWhereInput
  none?: OrphanWhereInput
}

export type IntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
  not?: number | NestedIntNullableFilter | null
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

export type MotherJobRelationFilter = {
  is?: MotherJobWhereInput | null
  isNot?: MotherJobWhereInput | null
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

export type MotherRelationFilter = {
  is?: MotherWhereInput | null
  isNot?: MotherWhereInput | null
}

export type Enumorphan_genderFilter = {
  equals?: orphan_gender
  in?: Enumerable<orphan_gender>
  notIn?: Enumerable<orphan_gender>
  not?: orphan_gender | NestedEnumorphan_genderFilter
}

export type Iga_propertyRelationFilter = {
  is?: Iga_propertyWhereInput | null
  isNot?: Iga_propertyWhereInput | null
}

export type OfficialDocumentsRelationFilter = {
  is?: OfficialDocumentsWhereInput | null
  isNot?: OfficialDocumentsWhereInput | null
}

export type EducationRelationFilter = {
  is?: EducationWhereInput | null
  isNot?: EducationWhereInput | null
}

export type FatherRelationFilter = {
  is?: FatherWhereInput | null
  isNot?: FatherWhereInput | null
}

export type GuardianRelationFilter = {
  is?: GuardianWhereInput | null
  isNot?: GuardianWhereInput | null
}

export type RegisteredGroupRelationFilter = {
  is?: RegisteredGroupWhereInput | null
  isNot?: RegisteredGroupWhereInput | null
}

export type SponsoredGroupRelationFilter = {
  is?: SponsoredGroupWhereInput | null
  isNot?: SponsoredGroupWhereInput | null
}

export type SiblingListRelationFilter = {
  every?: SiblingWhereInput
  some?: SiblingWhereInput
  none?: SiblingWhereInput
}

export type DonorRelationFilter = {
  is?: DonorWhereInput | null
  isNot?: DonorWhereInput | null
}

export type SocialWorkerRelationFilter = {
  is?: SocialWorkerWhereInput | null
  isNot?: SocialWorkerWhereInput | null
}

export type SupportRelationFilter = {
  is?: SupportWhereInput | null
  isNot?: SupportWhereInput | null
}

export type EducationalSupportRelationFilter = {
  is?: EducationalSupportWhereInput | null
  isNot?: EducationalSupportWhereInput | null
}

export type FinancialSupportRelationFilter = {
  is?: FinancialSupportWhereInput | null
  isNot?: FinancialSupportWhereInput | null
}

export type OtherSupportRelationFilter = {
  is?: OtherSupportWhereInput | null
  isNot?: OtherSupportWhereInput | null
}

export type SponsoredGroupCreateManyWithoutDonorInput = {
  create?: Enumerable<SponsoredGroupCreateWithoutDonorInput>
  connect?: Enumerable<SponsoredGroupWhereUniqueInput>
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type SponsoredGroupUpdateManyWithoutDonorInput = {
  create?: Enumerable<SponsoredGroupCreateWithoutDonorInput>
  connect?: Enumerable<SponsoredGroupWhereUniqueInput>
  set?: Enumerable<SponsoredGroupWhereUniqueInput>
  disconnect?: Enumerable<SponsoredGroupWhereUniqueInput>
  delete?: Enumerable<SponsoredGroupWhereUniqueInput>
  update?: Enumerable<SponsoredGroupUpdateWithWhereUniqueWithoutDonorInput>
  updateMany?: Enumerable<SponsoredGroupUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<SponsoredGroupScalarWhereInput>
  upsert?: Enumerable<SponsoredGroupUpsertWithWhereUniqueWithoutDonorInput>
}

export type OrphanCreateOneWithoutEducationInput = {
  create?: OrphanCreateWithoutEducationInput
  connect?: OrphanWhereUniqueInput
}

export type Enumeducation_enrollmentStatusFieldUpdateOperationsInput = {
  set?: education_enrollmentStatus
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type NullableEnumeducation_typeOfSchoolFieldUpdateOperationsInput = {
  set?: education_typeOfSchool | null
}

export type OrphanUpdateOneRequiredWithoutEducationInput = {
  create?: OrphanCreateWithoutEducationInput
  connect?: OrphanWhereUniqueInput
  update?: OrphanUpdateWithoutEducationDataInput
  upsert?: OrphanUpsertWithoutEducationInput
}

export type SupportCreateManyWithoutEducationalsupportInput = {
  create?: Enumerable<SupportCreateWithoutEducationalsupportInput>
  connect?: Enumerable<SupportWhereUniqueInput>
}

export type SupportUpdateManyWithoutEducationalsupportInput = {
  create?: Enumerable<SupportCreateWithoutEducationalsupportInput>
  connect?: Enumerable<SupportWhereUniqueInput>
  set?: Enumerable<SupportWhereUniqueInput>
  disconnect?: Enumerable<SupportWhereUniqueInput>
  delete?: Enumerable<SupportWhereUniqueInput>
  update?: Enumerable<SupportUpdateWithWhereUniqueWithoutEducationalsupportInput>
  updateMany?: Enumerable<SupportUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<SupportScalarWhereInput>
  upsert?: Enumerable<SupportUpsertWithWhereUniqueWithoutEducationalsupportInput>
}

export type OrphanCreateManyWithoutFatherInput = {
  create?: Enumerable<OrphanCreateWithoutFatherInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type IntFieldUpdateOperationsInput = {
  set?: number
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

export type SupportCreateManyWithoutFinancialsupportInput = {
  create?: Enumerable<SupportCreateWithoutFinancialsupportInput>
  connect?: Enumerable<SupportWhereUniqueInput>
}

export type SupportUpdateManyWithoutFinancialsupportInput = {
  create?: Enumerable<SupportCreateWithoutFinancialsupportInput>
  connect?: Enumerable<SupportWhereUniqueInput>
  set?: Enumerable<SupportWhereUniqueInput>
  disconnect?: Enumerable<SupportWhereUniqueInput>
  delete?: Enumerable<SupportWhereUniqueInput>
  update?: Enumerable<SupportUpdateWithWhereUniqueWithoutFinancialsupportInput>
  updateMany?: Enumerable<SupportUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<SupportScalarWhereInput>
  upsert?: Enumerable<SupportUpsertWithWhereUniqueWithoutFinancialsupportInput>
}

export type OrphanCreateManyWithoutGuardianInput = {
  create?: Enumerable<OrphanCreateWithoutGuardianInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
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

export type OrphanCreateManyWithoutIga_propertyInput = {
  create?: Enumerable<OrphanCreateWithoutIga_propertyInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
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

export type MotherJobCreateOneWithoutMotherInput = {
  create?: MotherJobCreateWithoutMotherInput
  connect?: MotherJobWhereUniqueInput
}

export type OrphanCreateManyWithoutMotherInput = {
  create?: Enumerable<OrphanCreateWithoutMotherInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type FloatFieldUpdateOperationsInput = {
  set?: number
}

export type MotherJobUpdateOneWithoutMotherInput = {
  create?: MotherJobCreateWithoutMotherInput
  connect?: MotherJobWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: MotherJobUpdateWithoutMotherDataInput
  upsert?: MotherJobUpsertWithoutMotherInput
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

export type MotherCreateOneWithoutMotherjobInput = {
  create?: MotherCreateWithoutMotherjobInput
  connect?: MotherWhereUniqueInput
}

export type NullableFloatFieldUpdateOperationsInput = {
  set?: number | null
}

export type MotherUpdateOneRequiredWithoutMotherjobInput = {
  create?: MotherCreateWithoutMotherjobInput
  connect?: MotherWhereUniqueInput
  update?: MotherUpdateWithoutMotherjobDataInput
  upsert?: MotherUpsertWithoutMotherjobInput
}

export type OrphanCreateOneWithoutOfficialdocumentsInput = {
  create?: OrphanCreateWithoutOfficialdocumentsInput
  connect?: OrphanWhereUniqueInput
}

export type OrphanUpdateOneRequiredWithoutOfficialdocumentsInput = {
  create?: OrphanCreateWithoutOfficialdocumentsInput
  connect?: OrphanWhereUniqueInput
  update?: OrphanUpdateWithoutOfficialdocumentsDataInput
  upsert?: OrphanUpsertWithoutOfficialdocumentsInput
}

export type Iga_propertyCreateOneWithoutOrphanInput = {
  create?: Iga_propertyCreateWithoutOrphanInput
  connect?: Iga_propertyWhereUniqueInput
}

export type OfficialDocumentsCreateOneWithoutOrphanInput = {
  create?: OfficialDocumentsCreateWithoutOrphanInput
  connect?: OfficialDocumentsWhereUniqueInput
}

export type EducationCreateOneWithoutOrphanInput = {
  create?: EducationCreateWithoutOrphanInput
  connect?: EducationWhereUniqueInput
}

export type FatherCreateOneWithoutOrphansInput = {
  create?: FatherCreateWithoutOrphansInput
  connect?: FatherWhereUniqueInput
}

export type GuardianCreateOneWithoutOrphansInput = {
  create?: GuardianCreateWithoutOrphansInput
  connect?: GuardianWhereUniqueInput
}

export type MotherCreateOneWithoutOrphansInput = {
  create?: MotherCreateWithoutOrphansInput
  connect?: MotherWhereUniqueInput
}

export type RegisteredGroupCreateOneWithoutOrphansInput = {
  create?: RegisteredGroupCreateWithoutOrphansInput
  connect?: RegisteredGroupWhereUniqueInput
}

export type SponsoredGroupCreateOneWithoutOrphansInput = {
  create?: SponsoredGroupCreateWithoutOrphansInput
  connect?: SponsoredGroupWhereUniqueInput
}

export type SiblingCreateManyWithoutOrphanInput = {
  create?: Enumerable<SiblingCreateWithoutOrphanInput>
  connect?: Enumerable<SiblingWhereUniqueInput>
}

export type Enumorphan_genderFieldUpdateOperationsInput = {
  set?: orphan_gender
}

export type Iga_propertyUpdateOneWithoutOrphanInput = {
  create?: Iga_propertyCreateWithoutOrphanInput
  connect?: Iga_propertyWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: Iga_propertyUpdateWithoutOrphanDataInput
  upsert?: Iga_propertyUpsertWithoutOrphanInput
}

export type OfficialDocumentsUpdateOneWithoutOrphanInput = {
  create?: OfficialDocumentsCreateWithoutOrphanInput
  connect?: OfficialDocumentsWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: OfficialDocumentsUpdateWithoutOrphanDataInput
  upsert?: OfficialDocumentsUpsertWithoutOrphanInput
}

export type EducationUpdateOneWithoutOrphanInput = {
  create?: EducationCreateWithoutOrphanInput
  connect?: EducationWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: EducationUpdateWithoutOrphanDataInput
  upsert?: EducationUpsertWithoutOrphanInput
}

export type FatherUpdateOneWithoutOrphansInput = {
  create?: FatherCreateWithoutOrphansInput
  connect?: FatherWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: FatherUpdateWithoutOrphansDataInput
  upsert?: FatherUpsertWithoutOrphansInput
}

export type GuardianUpdateOneWithoutOrphansInput = {
  create?: GuardianCreateWithoutOrphansInput
  connect?: GuardianWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: GuardianUpdateWithoutOrphansDataInput
  upsert?: GuardianUpsertWithoutOrphansInput
}

export type MotherUpdateOneWithoutOrphansInput = {
  create?: MotherCreateWithoutOrphansInput
  connect?: MotherWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: MotherUpdateWithoutOrphansDataInput
  upsert?: MotherUpsertWithoutOrphansInput
}

export type RegisteredGroupUpdateOneWithoutOrphansInput = {
  create?: RegisteredGroupCreateWithoutOrphansInput
  connect?: RegisteredGroupWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: RegisteredGroupUpdateWithoutOrphansDataInput
  upsert?: RegisteredGroupUpsertWithoutOrphansInput
}

export type SponsoredGroupUpdateOneWithoutOrphansInput = {
  create?: SponsoredGroupCreateWithoutOrphansInput
  connect?: SponsoredGroupWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: SponsoredGroupUpdateWithoutOrphansDataInput
  upsert?: SponsoredGroupUpsertWithoutOrphansInput
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

export type SupportCreateManyWithoutOthersupportInput = {
  create?: Enumerable<SupportCreateWithoutOthersupportInput>
  connect?: Enumerable<SupportWhereUniqueInput>
}

export type SupportUpdateManyWithoutOthersupportInput = {
  create?: Enumerable<SupportCreateWithoutOthersupportInput>
  connect?: Enumerable<SupportWhereUniqueInput>
  set?: Enumerable<SupportWhereUniqueInput>
  disconnect?: Enumerable<SupportWhereUniqueInput>
  delete?: Enumerable<SupportWhereUniqueInput>
  update?: Enumerable<SupportUpdateWithWhereUniqueWithoutOthersupportInput>
  updateMany?: Enumerable<SupportUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<SupportScalarWhereInput>
  upsert?: Enumerable<SupportUpsertWithWhereUniqueWithoutOthersupportInput>
}

export type OrphanCreateManyWithoutRegisteredgroupInput = {
  create?: Enumerable<OrphanCreateWithoutRegisteredgroupInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type OrphanUpdateManyWithoutRegisteredgroupInput = {
  create?: Enumerable<OrphanCreateWithoutRegisteredgroupInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
  set?: Enumerable<OrphanWhereUniqueInput>
  disconnect?: Enumerable<OrphanWhereUniqueInput>
  delete?: Enumerable<OrphanWhereUniqueInput>
  update?: Enumerable<OrphanUpdateWithWhereUniqueWithoutRegisteredgroupInput>
  updateMany?: Enumerable<OrphanUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<OrphanScalarWhereInput>
  upsert?: Enumerable<OrphanUpsertWithWhereUniqueWithoutRegisteredgroupInput>
}

export type OrphanCreateOneWithoutSiblingsInput = {
  create?: OrphanCreateWithoutSiblingsInput
  connect?: OrphanWhereUniqueInput
}

export type OrphanUpdateOneWithoutSiblingsInput = {
  create?: OrphanCreateWithoutSiblingsInput
  connect?: OrphanWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: OrphanUpdateWithoutSiblingsDataInput
  upsert?: OrphanUpsertWithoutSiblingsInput
}

export type SponsoredGroupCreateManyWithoutSocialworkersInput = {
  create?: Enumerable<SponsoredGroupCreateWithoutSocialworkersInput>
  connect?: Enumerable<SponsoredGroupWhereUniqueInput>
}

export type SponsoredGroupUpdateManyWithoutSocialworkersInput = {
  create?: Enumerable<SponsoredGroupCreateWithoutSocialworkersInput>
  connect?: Enumerable<SponsoredGroupWhereUniqueInput>
  set?: Enumerable<SponsoredGroupWhereUniqueInput>
  disconnect?: Enumerable<SponsoredGroupWhereUniqueInput>
  delete?: Enumerable<SponsoredGroupWhereUniqueInput>
  update?: Enumerable<SponsoredGroupUpdateWithWhereUniqueWithoutSocialworkersInput>
  updateMany?: Enumerable<SponsoredGroupUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<SponsoredGroupScalarWhereInput>
  upsert?: Enumerable<SponsoredGroupUpsertWithWhereUniqueWithoutSocialworkersInput>
}

export type DonorCreateOneWithoutSponsoredgroupsInput = {
  create?: DonorCreateWithoutSponsoredgroupsInput
  connect?: DonorWhereUniqueInput
}

export type SocialWorkerCreateOneWithoutSponsoredgroupInput = {
  create?: SocialWorkerCreateWithoutSponsoredgroupInput
  connect?: SocialWorkerWhereUniqueInput
}

export type SupportCreateOneWithoutSponsoredgroupInput = {
  create?: SupportCreateWithoutSponsoredgroupInput
  connect?: SupportWhereUniqueInput
}

export type OrphanCreateManyWithoutSponsoredgroupInput = {
  create?: Enumerable<OrphanCreateWithoutSponsoredgroupInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
}

export type DonorUpdateOneWithoutSponsoredgroupsInput = {
  create?: DonorCreateWithoutSponsoredgroupsInput
  connect?: DonorWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: DonorUpdateWithoutSponsoredgroupsDataInput
  upsert?: DonorUpsertWithoutSponsoredgroupsInput
}

export type SocialWorkerUpdateOneWithoutSponsoredgroupInput = {
  create?: SocialWorkerCreateWithoutSponsoredgroupInput
  connect?: SocialWorkerWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: SocialWorkerUpdateWithoutSponsoredgroupDataInput
  upsert?: SocialWorkerUpsertWithoutSponsoredgroupInput
}

export type SupportUpdateOneWithoutSponsoredgroupInput = {
  create?: SupportCreateWithoutSponsoredgroupInput
  connect?: SupportWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: SupportUpdateWithoutSponsoredgroupDataInput
  upsert?: SupportUpsertWithoutSponsoredgroupInput
}

export type OrphanUpdateManyWithoutSponsoredgroupInput = {
  create?: Enumerable<OrphanCreateWithoutSponsoredgroupInput>
  connect?: Enumerable<OrphanWhereUniqueInput>
  set?: Enumerable<OrphanWhereUniqueInput>
  disconnect?: Enumerable<OrphanWhereUniqueInput>
  delete?: Enumerable<OrphanWhereUniqueInput>
  update?: Enumerable<OrphanUpdateWithWhereUniqueWithoutSponsoredgroupInput>
  updateMany?: Enumerable<OrphanUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<OrphanScalarWhereInput>
  upsert?: Enumerable<OrphanUpsertWithWhereUniqueWithoutSponsoredgroupInput>
}

export type EducationalSupportCreateOneWithoutSupportInput = {
  create?: EducationalSupportCreateWithoutSupportInput
  connect?: EducationalSupportWhereUniqueInput
}

export type FinancialSupportCreateOneWithoutSupportInput = {
  create?: FinancialSupportCreateWithoutSupportInput
  connect?: FinancialSupportWhereUniqueInput
}

export type OtherSupportCreateOneWithoutSupportInput = {
  create?: OtherSupportCreateWithoutSupportInput
  connect?: OtherSupportWhereUniqueInput
}

export type SponsoredGroupCreateManyWithoutSupportInput = {
  create?: Enumerable<SponsoredGroupCreateWithoutSupportInput>
  connect?: Enumerable<SponsoredGroupWhereUniqueInput>
}

export type EducationalSupportUpdateOneWithoutSupportInput = {
  create?: EducationalSupportCreateWithoutSupportInput
  connect?: EducationalSupportWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: EducationalSupportUpdateWithoutSupportDataInput
}

export type FinancialSupportUpdateOneWithoutSupportInput = {
  create?: FinancialSupportCreateWithoutSupportInput
  connect?: FinancialSupportWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: FinancialSupportUpdateWithoutSupportDataInput
}

export type OtherSupportUpdateOneWithoutSupportInput = {
  create?: OtherSupportCreateWithoutSupportInput
  connect?: OtherSupportWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: OtherSupportUpdateWithoutSupportDataInput
}

export type SponsoredGroupUpdateManyWithoutSupportInput = {
  create?: Enumerable<SponsoredGroupCreateWithoutSupportInput>
  connect?: Enumerable<SponsoredGroupWhereUniqueInput>
  set?: Enumerable<SponsoredGroupWhereUniqueInput>
  disconnect?: Enumerable<SponsoredGroupWhereUniqueInput>
  delete?: Enumerable<SponsoredGroupWhereUniqueInput>
  update?: Enumerable<SponsoredGroupUpdateWithWhereUniqueWithoutSupportInput>
  updateMany?: Enumerable<SponsoredGroupUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<SponsoredGroupScalarWhereInput>
  upsert?: Enumerable<SponsoredGroupUpsertWithWhereUniqueWithoutSupportInput>
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

export type NestedEnumeducation_enrollmentStatusFilter = {
  equals?: education_enrollmentStatus
  in?: Enumerable<education_enrollmentStatus>
  notIn?: Enumerable<education_enrollmentStatus>
  not?: NestedEnumeducation_enrollmentStatusFilter | null
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

export type NestedEnumeducation_typeOfSchoolNullableFilter = {
  equals?: education_typeOfSchool | null
  in?: Enumerable<education_typeOfSchool> | null
  notIn?: Enumerable<education_typeOfSchool> | null
  not?: NestedEnumeducation_typeOfSchoolNullableFilter | null
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

export type NestedIntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
  not?: NestedIntNullableFilter | null
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

export type NestedEnumorphan_genderFilter = {
  equals?: orphan_gender
  in?: Enumerable<orphan_gender>
  notIn?: Enumerable<orphan_gender>
  not?: NestedEnumorphan_genderFilter | null
}

export type SponsoredGroupCreateWithoutDonorInput = {
  sponsorshipDate: Date | string
  socialworkers?: SocialWorkerCreateOneWithoutSponsoredgroupInput
  support?: SupportCreateOneWithoutSponsoredgroupInput
  orphans?: OrphanCreateManyWithoutSponsoredgroupInput
}

export type SponsoredGroupUpdateWithWhereUniqueWithoutDonorInput = {
  where: SponsoredGroupWhereUniqueInput
  data: SponsoredGroupUpdateWithoutDonorDataInput
}

export type SponsoredGroupUpdateManyWithWhereNestedInput = {
  where: SponsoredGroupScalarWhereInput
  data: SponsoredGroupUpdateManyDataInput
}

export type SponsoredGroupScalarWhereInput = {
  AND?: Enumerable<SponsoredGroupScalarWhereInput>
  OR?: Array<SponsoredGroupScalarWhereInput>
  NOT?: Enumerable<SponsoredGroupScalarWhereInput>
  id?: number | IntFilter
  sponsorshipDate?: Date | string | DateTimeFilter
  supportId?: number | IntNullableFilter | null
  donorId?: number | IntNullableFilter | null
  socialWorkerId?: number | IntNullableFilter | null
}

export type SponsoredGroupUpsertWithWhereUniqueWithoutDonorInput = {
  where: SponsoredGroupWhereUniqueInput
  update: SponsoredGroupUpdateWithoutDonorDataInput
  create: SponsoredGroupCreateWithoutDonorInput
}

export type OrphanCreateWithoutEducationInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
}

export type OrphanUpdateWithoutEducationDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type OrphanUpsertWithoutEducationInput = {
  update: OrphanUpdateWithoutEducationDataInput
  create: OrphanCreateWithoutEducationInput
}

export type SupportCreateWithoutEducationalsupportInput = {
  status?: string | null
  financialsupport?: FinancialSupportCreateOneWithoutSupportInput
  othersupport?: OtherSupportCreateOneWithoutSupportInput
  sponsoredgroup?: SponsoredGroupCreateManyWithoutSupportInput
}

export type SupportUpdateWithWhereUniqueWithoutEducationalsupportInput = {
  where: SupportWhereUniqueInput
  data: SupportUpdateWithoutEducationalsupportDataInput
}

export type SupportUpdateManyWithWhereNestedInput = {
  where: SupportScalarWhereInput
  data: SupportUpdateManyDataInput
}

export type SupportScalarWhereInput = {
  AND?: Enumerable<SupportScalarWhereInput>
  OR?: Array<SupportScalarWhereInput>
  NOT?: Enumerable<SupportScalarWhereInput>
  id?: number | IntFilter
  status?: string | StringNullableFilter | null
  financialId?: number | IntNullableFilter | null
  educationalId?: number | IntNullableFilter | null
  otherId?: number | IntNullableFilter | null
}

export type SupportUpsertWithWhereUniqueWithoutEducationalsupportInput = {
  where: SupportWhereUniqueInput
  update: SupportUpdateWithoutEducationalsupportDataInput
  create: SupportCreateWithoutEducationalsupportInput
}

export type OrphanCreateWithoutFatherInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
}

export type OrphanUpdateWithWhereUniqueWithoutFatherInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutFatherDataInput
}

export type OrphanUpdateManyWithWhereNestedInput = {
  where: OrphanScalarWhereInput
  data: OrphanUpdateManyDataInput
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
  gender?: orphan_gender | Enumorphan_genderFilter
  placeOfBirth?: string | StringFilter
  dateOfBirth?: Date | string | DateTimeFilter
  numberOfSponserdSiblings?: number | IntFilter
  physicalHealthStatus?: string | StringFilter
  psychologicalHealthStatus?: string | StringFilter
  otherHealthIssues?: string | StringFilter
  fatherId?: number | IntNullableFilter | null
  motherId?: number | IntNullableFilter | null
  guardianId?: number | IntNullableFilter | null
  IGA_PropertyId?: number | IntNullableFilter | null
  educationId?: number | IntNullableFilter | null
  docsId?: number | IntNullableFilter | null
  regGroupId?: number | IntNullableFilter | null
  sponsrGroupId?: number | IntNullableFilter | null
}

export type OrphanUpsertWithWhereUniqueWithoutFatherInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutFatherDataInput
  create: OrphanCreateWithoutFatherInput
}

export type SupportCreateWithoutFinancialsupportInput = {
  status?: string | null
  educationalsupport?: EducationalSupportCreateOneWithoutSupportInput
  othersupport?: OtherSupportCreateOneWithoutSupportInput
  sponsoredgroup?: SponsoredGroupCreateManyWithoutSupportInput
}

export type SupportUpdateWithWhereUniqueWithoutFinancialsupportInput = {
  where: SupportWhereUniqueInput
  data: SupportUpdateWithoutFinancialsupportDataInput
}

export type SupportUpsertWithWhereUniqueWithoutFinancialsupportInput = {
  where: SupportWhereUniqueInput
  update: SupportUpdateWithoutFinancialsupportDataInput
  create: SupportCreateWithoutFinancialsupportInput
}

export type OrphanCreateWithoutGuardianInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
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

export type OrphanCreateWithoutIga_propertyInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
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

export type MotherJobCreateWithoutMotherInput = {
  currentJobTitle?: string | null
  monthlyIncome?: number | null
}

export type OrphanCreateWithoutMotherInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
}

export type MotherJobUpdateWithoutMotherDataInput = {
  currentJobTitle?: string | NullableStringFieldUpdateOperationsInput | null
  monthlyIncome?: number | NullableFloatFieldUpdateOperationsInput | null
}

export type MotherJobUpsertWithoutMotherInput = {
  update: MotherJobUpdateWithoutMotherDataInput
  create: MotherJobCreateWithoutMotherInput
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

export type MotherCreateWithoutMotherjobInput = {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: Date | string
  phoneNumber: string
  maritalStatus: string
  vitalStatus: string
  monthlyExpense: number
  orphans?: OrphanCreateManyWithoutMotherInput
}

export type MotherUpdateWithoutMotherjobDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  middleName?: string | StringFieldUpdateOperationsInput
  lastName?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  phoneNumber?: string | StringFieldUpdateOperationsInput
  maritalStatus?: string | StringFieldUpdateOperationsInput
  vitalStatus?: string | StringFieldUpdateOperationsInput
  monthlyExpense?: number | FloatFieldUpdateOperationsInput
  orphans?: OrphanUpdateManyWithoutMotherInput
}

export type MotherUpsertWithoutMotherjobInput = {
  update: MotherUpdateWithoutMotherjobDataInput
  create: MotherCreateWithoutMotherjobInput
}

export type OrphanCreateWithoutOfficialdocumentsInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
}

export type OrphanUpdateWithoutOfficialdocumentsDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type OrphanUpsertWithoutOfficialdocumentsInput = {
  update: OrphanUpdateWithoutOfficialdocumentsDataInput
  create: OrphanCreateWithoutOfficialdocumentsInput
}

export type Iga_propertyCreateWithoutOrphanInput = {
  ownershipStatus: string
  otherProperty?: string | null
}

export type OfficialDocumentsCreateWithoutOrphanInput = {
  photoPortraitUrl: string
  photoLongUrl: string
  fatherDeathCertificateUrl: string
  birthCertificateUrl: string
  guardianIDCardUrl: string
  guardianConfirmationLetterUrl: string
}

export type EducationCreateWithoutOrphanInput = {
  enrollmentStatus: education_enrollmentStatus
  schoolName?: string | null
  typeOfSchool?: education_typeOfSchool | null
  grade?: string | null
  reason?: string | null
  hobbies?: string | null
}

export type FatherCreateWithoutOrphansInput = {
  dateOfDeath: Date | string
  causeOfDeath: string
  job?: string | null
  monthlyIncome: number
  dateOfBirth: Date | string
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

export type MotherCreateWithoutOrphansInput = {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: Date | string
  phoneNumber: string
  maritalStatus: string
  vitalStatus: string
  monthlyExpense: number
  motherjob?: MotherJobCreateOneWithoutMotherInput
}

export type RegisteredGroupCreateWithoutOrphansInput = {
  registrationDate: Date | string
  siteName: string
  state: string
  zone: string
  district: string
  kebele: string
}

export type SponsoredGroupCreateWithoutOrphansInput = {
  sponsorshipDate: Date | string
  donor?: DonorCreateOneWithoutSponsoredgroupsInput
  socialworkers?: SocialWorkerCreateOneWithoutSponsoredgroupInput
  support?: SupportCreateOneWithoutSponsoredgroupInput
}

export type SiblingCreateWithoutOrphanInput = {
  fullName: string
  gender: string
  age: number
  schoolGrade?: string | null
  job?: string | null
  maritalStatus: string
}

export type Iga_propertyUpdateWithoutOrphanDataInput = {
  ownershipStatus?: string | StringFieldUpdateOperationsInput
  otherProperty?: string | NullableStringFieldUpdateOperationsInput | null
}

export type Iga_propertyUpsertWithoutOrphanInput = {
  update: Iga_propertyUpdateWithoutOrphanDataInput
  create: Iga_propertyCreateWithoutOrphanInput
}

export type OfficialDocumentsUpdateWithoutOrphanDataInput = {
  photoPortraitUrl?: string | StringFieldUpdateOperationsInput
  photoLongUrl?: string | StringFieldUpdateOperationsInput
  fatherDeathCertificateUrl?: string | StringFieldUpdateOperationsInput
  birthCertificateUrl?: string | StringFieldUpdateOperationsInput
  guardianIDCardUrl?: string | StringFieldUpdateOperationsInput
  guardianConfirmationLetterUrl?: string | StringFieldUpdateOperationsInput
}

export type OfficialDocumentsUpsertWithoutOrphanInput = {
  update: OfficialDocumentsUpdateWithoutOrphanDataInput
  create: OfficialDocumentsCreateWithoutOrphanInput
}

export type EducationUpdateWithoutOrphanDataInput = {
  enrollmentStatus?: education_enrollmentStatus | Enumeducation_enrollmentStatusFieldUpdateOperationsInput
  schoolName?: string | NullableStringFieldUpdateOperationsInput | null
  typeOfSchool?: education_typeOfSchool | NullableEnumeducation_typeOfSchoolFieldUpdateOperationsInput | null
  grade?: string | NullableStringFieldUpdateOperationsInput | null
  reason?: string | NullableStringFieldUpdateOperationsInput | null
  hobbies?: string | NullableStringFieldUpdateOperationsInput | null
}

export type EducationUpsertWithoutOrphanInput = {
  update: EducationUpdateWithoutOrphanDataInput
  create: EducationCreateWithoutOrphanInput
}

export type FatherUpdateWithoutOrphansDataInput = {
  dateOfDeath?: Date | string | DateTimeFieldUpdateOperationsInput
  causeOfDeath?: string | StringFieldUpdateOperationsInput
  job?: string | NullableStringFieldUpdateOperationsInput | null
  monthlyIncome?: number | IntFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type FatherUpsertWithoutOrphansInput = {
  update: FatherUpdateWithoutOrphansDataInput
  create: FatherCreateWithoutOrphansInput
}

export type GuardianUpdateWithoutOrphansDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  middleName?: string | StringFieldUpdateOperationsInput
  lastName?: string | StringFieldUpdateOperationsInput
  gender?: string | StringFieldUpdateOperationsInput
  nationality?: string | StringFieldUpdateOperationsInput
  state?: string | StringFieldUpdateOperationsInput
  zone?: string | StringFieldUpdateOperationsInput
  district?: string | StringFieldUpdateOperationsInput
  kebele?: string | StringFieldUpdateOperationsInput
  relationToOrphan?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  job?: string | NullableStringFieldUpdateOperationsInput | null
  age?: number | IntFieldUpdateOperationsInput
}

export type GuardianUpsertWithoutOrphansInput = {
  update: GuardianUpdateWithoutOrphansDataInput
  create: GuardianCreateWithoutOrphansInput
}

export type MotherUpdateWithoutOrphansDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  middleName?: string | StringFieldUpdateOperationsInput
  lastName?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  phoneNumber?: string | StringFieldUpdateOperationsInput
  maritalStatus?: string | StringFieldUpdateOperationsInput
  vitalStatus?: string | StringFieldUpdateOperationsInput
  monthlyExpense?: number | FloatFieldUpdateOperationsInput
  motherjob?: MotherJobUpdateOneWithoutMotherInput
}

export type MotherUpsertWithoutOrphansInput = {
  update: MotherUpdateWithoutOrphansDataInput
  create: MotherCreateWithoutOrphansInput
}

export type RegisteredGroupUpdateWithoutOrphansDataInput = {
  registrationDate?: Date | string | DateTimeFieldUpdateOperationsInput
  siteName?: string | StringFieldUpdateOperationsInput
  state?: string | StringFieldUpdateOperationsInput
  zone?: string | StringFieldUpdateOperationsInput
  district?: string | StringFieldUpdateOperationsInput
  kebele?: string | StringFieldUpdateOperationsInput
}

export type RegisteredGroupUpsertWithoutOrphansInput = {
  update: RegisteredGroupUpdateWithoutOrphansDataInput
  create: RegisteredGroupCreateWithoutOrphansInput
}

export type SponsoredGroupUpdateWithoutOrphansDataInput = {
  sponsorshipDate?: Date | string | DateTimeFieldUpdateOperationsInput
  donor?: DonorUpdateOneWithoutSponsoredgroupsInput
  socialworkers?: SocialWorkerUpdateOneWithoutSponsoredgroupInput
  support?: SupportUpdateOneWithoutSponsoredgroupInput
}

export type SponsoredGroupUpsertWithoutOrphansInput = {
  update: SponsoredGroupUpdateWithoutOrphansDataInput
  create: SponsoredGroupCreateWithoutOrphansInput
}

export type SiblingUpdateWithWhereUniqueWithoutOrphanInput = {
  where: SiblingWhereUniqueInput
  data: SiblingUpdateWithoutOrphanDataInput
}

export type SiblingUpdateManyWithWhereNestedInput = {
  where: SiblingScalarWhereInput
  data: SiblingUpdateManyDataInput
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
  orphanId?: number | IntNullableFilter | null
}

export type SiblingUpsertWithWhereUniqueWithoutOrphanInput = {
  where: SiblingWhereUniqueInput
  update: SiblingUpdateWithoutOrphanDataInput
  create: SiblingCreateWithoutOrphanInput
}

export type SupportCreateWithoutOthersupportInput = {
  status?: string | null
  educationalsupport?: EducationalSupportCreateOneWithoutSupportInput
  financialsupport?: FinancialSupportCreateOneWithoutSupportInput
  sponsoredgroup?: SponsoredGroupCreateManyWithoutSupportInput
}

export type SupportUpdateWithWhereUniqueWithoutOthersupportInput = {
  where: SupportWhereUniqueInput
  data: SupportUpdateWithoutOthersupportDataInput
}

export type SupportUpsertWithWhereUniqueWithoutOthersupportInput = {
  where: SupportWhereUniqueInput
  update: SupportUpdateWithoutOthersupportDataInput
  create: SupportCreateWithoutOthersupportInput
}

export type OrphanCreateWithoutRegisteredgroupInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
}

export type OrphanUpdateWithWhereUniqueWithoutRegisteredgroupInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutRegisteredgroupDataInput
}

export type OrphanUpsertWithWhereUniqueWithoutRegisteredgroupInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutRegisteredgroupDataInput
  create: OrphanCreateWithoutRegisteredgroupInput
}

export type OrphanCreateWithoutSiblingsInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupCreateOneWithoutOrphansInput
}

export type OrphanUpdateWithoutSiblingsDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
}

export type OrphanUpsertWithoutSiblingsInput = {
  update: OrphanUpdateWithoutSiblingsDataInput
  create: OrphanCreateWithoutSiblingsInput
}

export type SponsoredGroupCreateWithoutSocialworkersInput = {
  sponsorshipDate: Date | string
  donor?: DonorCreateOneWithoutSponsoredgroupsInput
  support?: SupportCreateOneWithoutSponsoredgroupInput
  orphans?: OrphanCreateManyWithoutSponsoredgroupInput
}

export type SponsoredGroupUpdateWithWhereUniqueWithoutSocialworkersInput = {
  where: SponsoredGroupWhereUniqueInput
  data: SponsoredGroupUpdateWithoutSocialworkersDataInput
}

export type SponsoredGroupUpsertWithWhereUniqueWithoutSocialworkersInput = {
  where: SponsoredGroupWhereUniqueInput
  update: SponsoredGroupUpdateWithoutSocialworkersDataInput
  create: SponsoredGroupCreateWithoutSocialworkersInput
}

export type DonorCreateWithoutSponsoredgroupsInput = {
  companyName: string
  initialReportPreparationDate?: Date | string | null
  finalReportPreparationDate?: Date | string | null
  initialDataCollectionDate?: Date | string | null
  finalDataCollectionDate?: Date | string | null
  reportDueDate?: Date | string | null
}

export type SocialWorkerCreateWithoutSponsoredgroupInput = {
  fullName: string
  phoneNumber: string
  email: string
}

export type SupportCreateWithoutSponsoredgroupInput = {
  status?: string | null
  educationalsupport?: EducationalSupportCreateOneWithoutSupportInput
  financialsupport?: FinancialSupportCreateOneWithoutSupportInput
  othersupport?: OtherSupportCreateOneWithoutSupportInput
}

export type OrphanCreateWithoutSponsoredgroupInput = {
  firstName: string
  fatherName: string
  grandFatherName: string
  greatGrandFatherName: string
  gender: orphan_gender
  placeOfBirth: string
  dateOfBirth: Date | string
  numberOfSponserdSiblings: number
  physicalHealthStatus: string
  psychologicalHealthStatus: string
  otherHealthIssues: string
  iga_property?: Iga_propertyCreateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsCreateOneWithoutOrphanInput
  education?: EducationCreateOneWithoutOrphanInput
  father?: FatherCreateOneWithoutOrphansInput
  guardian?: GuardianCreateOneWithoutOrphansInput
  mother?: MotherCreateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupCreateOneWithoutOrphansInput
  siblings?: SiblingCreateManyWithoutOrphanInput
}

export type DonorUpdateWithoutSponsoredgroupsDataInput = {
  companyName?: string | StringFieldUpdateOperationsInput
  initialReportPreparationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  finalReportPreparationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  initialDataCollectionDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  finalDataCollectionDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  reportDueDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type DonorUpsertWithoutSponsoredgroupsInput = {
  update: DonorUpdateWithoutSponsoredgroupsDataInput
  create: DonorCreateWithoutSponsoredgroupsInput
}

export type SocialWorkerUpdateWithoutSponsoredgroupDataInput = {
  fullName?: string | StringFieldUpdateOperationsInput
  phoneNumber?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
}

export type SocialWorkerUpsertWithoutSponsoredgroupInput = {
  update: SocialWorkerUpdateWithoutSponsoredgroupDataInput
  create: SocialWorkerCreateWithoutSponsoredgroupInput
}

export type SupportUpdateWithoutSponsoredgroupDataInput = {
  status?: string | NullableStringFieldUpdateOperationsInput | null
  educationalsupport?: EducationalSupportUpdateOneWithoutSupportInput
  financialsupport?: FinancialSupportUpdateOneWithoutSupportInput
  othersupport?: OtherSupportUpdateOneWithoutSupportInput
}

export type SupportUpsertWithoutSponsoredgroupInput = {
  update: SupportUpdateWithoutSponsoredgroupDataInput
  create: SupportCreateWithoutSponsoredgroupInput
}

export type OrphanUpdateWithWhereUniqueWithoutSponsoredgroupInput = {
  where: OrphanWhereUniqueInput
  data: OrphanUpdateWithoutSponsoredgroupDataInput
}

export type OrphanUpsertWithWhereUniqueWithoutSponsoredgroupInput = {
  where: OrphanWhereUniqueInput
  update: OrphanUpdateWithoutSponsoredgroupDataInput
  create: OrphanCreateWithoutSponsoredgroupInput
}

export type EducationalSupportCreateWithoutSupportInput = {

}

export type FinancialSupportCreateWithoutSupportInput = {

}

export type OtherSupportCreateWithoutSupportInput = {

}

export type SponsoredGroupCreateWithoutSupportInput = {
  sponsorshipDate: Date | string
  donor?: DonorCreateOneWithoutSponsoredgroupsInput
  socialworkers?: SocialWorkerCreateOneWithoutSponsoredgroupInput
  orphans?: OrphanCreateManyWithoutSponsoredgroupInput
}

export type EducationalSupportUpdateWithoutSupportDataInput = {

}

export type FinancialSupportUpdateWithoutSupportDataInput = {

}

export type OtherSupportUpdateWithoutSupportDataInput = {

}

export type SponsoredGroupUpdateWithWhereUniqueWithoutSupportInput = {
  where: SponsoredGroupWhereUniqueInput
  data: SponsoredGroupUpdateWithoutSupportDataInput
}

export type SponsoredGroupUpsertWithWhereUniqueWithoutSupportInput = {
  where: SponsoredGroupWhereUniqueInput
  update: SponsoredGroupUpdateWithoutSupportDataInput
  create: SponsoredGroupCreateWithoutSupportInput
}

export type SponsoredGroupUpdateWithoutDonorDataInput = {
  sponsorshipDate?: Date | string | DateTimeFieldUpdateOperationsInput
  socialworkers?: SocialWorkerUpdateOneWithoutSponsoredgroupInput
  support?: SupportUpdateOneWithoutSponsoredgroupInput
  orphans?: OrphanUpdateManyWithoutSponsoredgroupInput
}

export type SponsoredGroupUpdateManyDataInput = {
  sponsorshipDate?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type SupportUpdateWithoutEducationalsupportDataInput = {
  status?: string | NullableStringFieldUpdateOperationsInput | null
  financialsupport?: FinancialSupportUpdateOneWithoutSupportInput
  othersupport?: OtherSupportUpdateOneWithoutSupportInput
  sponsoredgroup?: SponsoredGroupUpdateManyWithoutSupportInput
}

export type SupportUpdateManyDataInput = {
  status?: string | NullableStringFieldUpdateOperationsInput | null
}

export type OrphanUpdateWithoutFatherDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type OrphanUpdateManyDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
}

export type SupportUpdateWithoutFinancialsupportDataInput = {
  status?: string | NullableStringFieldUpdateOperationsInput | null
  educationalsupport?: EducationalSupportUpdateOneWithoutSupportInput
  othersupport?: OtherSupportUpdateOneWithoutSupportInput
  sponsoredgroup?: SponsoredGroupUpdateManyWithoutSupportInput
}

export type OrphanUpdateWithoutGuardianDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type OrphanUpdateWithoutIga_propertyDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type OrphanUpdateWithoutMotherDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type SiblingUpdateWithoutOrphanDataInput = {
  fullName?: string | StringFieldUpdateOperationsInput
  gender?: string | StringFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  schoolGrade?: string | NullableStringFieldUpdateOperationsInput | null
  job?: string | NullableStringFieldUpdateOperationsInput | null
  maritalStatus?: string | StringFieldUpdateOperationsInput
}

export type SiblingUpdateManyDataInput = {
  fullName?: string | StringFieldUpdateOperationsInput
  gender?: string | StringFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  schoolGrade?: string | NullableStringFieldUpdateOperationsInput | null
  job?: string | NullableStringFieldUpdateOperationsInput | null
  maritalStatus?: string | StringFieldUpdateOperationsInput
}

export type SupportUpdateWithoutOthersupportDataInput = {
  status?: string | NullableStringFieldUpdateOperationsInput | null
  educationalsupport?: EducationalSupportUpdateOneWithoutSupportInput
  financialsupport?: FinancialSupportUpdateOneWithoutSupportInput
  sponsoredgroup?: SponsoredGroupUpdateManyWithoutSupportInput
}

export type OrphanUpdateWithoutRegisteredgroupDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  sponsoredgroup?: SponsoredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type SponsoredGroupUpdateWithoutSocialworkersDataInput = {
  sponsorshipDate?: Date | string | DateTimeFieldUpdateOperationsInput
  donor?: DonorUpdateOneWithoutSponsoredgroupsInput
  support?: SupportUpdateOneWithoutSponsoredgroupInput
  orphans?: OrphanUpdateManyWithoutSponsoredgroupInput
}

export type OrphanUpdateWithoutSponsoredgroupDataInput = {
  firstName?: string | StringFieldUpdateOperationsInput
  fatherName?: string | StringFieldUpdateOperationsInput
  grandFatherName?: string | StringFieldUpdateOperationsInput
  greatGrandFatherName?: string | StringFieldUpdateOperationsInput
  gender?: orphan_gender | Enumorphan_genderFieldUpdateOperationsInput
  placeOfBirth?: string | StringFieldUpdateOperationsInput
  dateOfBirth?: Date | string | DateTimeFieldUpdateOperationsInput
  numberOfSponserdSiblings?: number | IntFieldUpdateOperationsInput
  physicalHealthStatus?: string | StringFieldUpdateOperationsInput
  psychologicalHealthStatus?: string | StringFieldUpdateOperationsInput
  otherHealthIssues?: string | StringFieldUpdateOperationsInput
  iga_property?: Iga_propertyUpdateOneWithoutOrphanInput
  officialdocuments?: OfficialDocumentsUpdateOneWithoutOrphanInput
  education?: EducationUpdateOneWithoutOrphanInput
  father?: FatherUpdateOneWithoutOrphansInput
  guardian?: GuardianUpdateOneWithoutOrphansInput
  mother?: MotherUpdateOneWithoutOrphansInput
  registeredgroup?: RegisteredGroupUpdateOneWithoutOrphansInput
  siblings?: SiblingUpdateManyWithoutOrphanInput
}

export type SponsoredGroupUpdateWithoutSupportDataInput = {
  sponsorshipDate?: Date | string | DateTimeFieldUpdateOperationsInput
  donor?: DonorUpdateOneWithoutSponsoredgroupsInput
  socialworkers?: SocialWorkerUpdateOneWithoutSponsoredgroupInput
  orphans?: OrphanUpdateManyWithoutSponsoredgroupInput
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
