
import { defineConfig } from 'vite';
import { SearchPlugin } from "vitepress-plugin-search"
import  flexSearchIndexOptions from 'flexsearch'
export default defineConfig
({
    plugins: [
        SearchPlugin({
         ...flexSearchIndexOptions,
         previewLength: 100,
         buttonLabel: '',
         placeholder: ''
        })
       ],
  
}
)