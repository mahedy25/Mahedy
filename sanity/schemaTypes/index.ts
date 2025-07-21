import { type SchemaTypeDefinition } from 'sanity'



import {postType} from './postType'
import { toolType } from './tools'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ postType, toolType],
}
