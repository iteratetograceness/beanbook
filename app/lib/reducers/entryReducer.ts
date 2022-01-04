export const DefaultEntry = {
  id: '',
  userid: '',
  favorited: false,
  origin_name: '',
  price: null,
  roaster: '',
  producer: '',
  roast_date: null,
  variety: '',
  process: '',
  rating: 3,
  notes: '',
  brew_method: [],
  taste_tags: []
}

export const EntryReducer = (entry: DefaultEntry, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case 'UPDATE_ENTRY':
      return {
        ...entry,
        ...payload
      }

    default:
      return entry
  }
}

export interface DefaultEntry {
  id: string,
  userid: string | any,
  favorited: boolean,
  origin_name: string,
  price?: number | null,
  roaster?: string,
  producer?: string,
  roast_date?: Date | null,
  variety?: string,
  process?: string,
  rating: number | null,
  notes?: string,
  brew_method?: [string] | never[],
  taste_tags?: [string] | never[],
}