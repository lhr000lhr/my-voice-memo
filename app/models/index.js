import records from './records'
import textPreview from './textPreview'

export const registerModels = app => {
  app.model(records)
  app.model(textPreview)
}
