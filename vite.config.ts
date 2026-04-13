import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const radiantRoot = '/Users/ajit/Documents/GitHub/radiant-frontend'
const nm = (pkg: string) => resolve(__dirname, 'node_modules', pkg)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Radiant lib paths
      { find: '@radiant/common/assets', replacement: resolve(radiantRoot, 'libs/common/assets/src/index.ts') },
      { find: '@radiant/common/hooks', replacement: resolve(radiantRoot, 'libs/common/hooks/src/index.ts') },
      { find: '@radiant/common/models', replacement: resolve(radiantRoot, 'libs/common/models/src/index.ts') },
      { find: '@radiant/common/theme', replacement: resolve(radiantRoot, 'libs/common/theme/src/index.ts') },
      { find: '@radiant/common/ui', replacement: resolve(radiantRoot, 'libs/common/ui/src/index.ts') },
      { find: '@radiant/common/utils', replacement: resolve(__dirname, 'src/shims/radiant-common-utils.ts') },
      // Resolve all shared deps from our node_modules so external sources can find them
      { find: 'react/jsx-runtime', replacement: nm('react/jsx-runtime') },
      { find: 'react', replacement: nm('react') },
      { find: 'react-dom', replacement: nm('react-dom') },
      { find: '@chakra-ui/avatar', replacement: nm('@chakra-ui/avatar') },
      { find: '@chakra-ui/layout', replacement: nm('@chakra-ui/layout') },
      { find: '@chakra-ui/provider', replacement: nm('@chakra-ui/provider') },
      { find: '@chakra-ui/react', replacement: nm('@chakra-ui/react') },
      { find: '@chakra-ui/styled-system', replacement: nm('@chakra-ui/styled-system') },
      { find: '@chakra-ui/theme-tools', replacement: nm('@chakra-ui/theme-tools') },
      { find: '@chakra-ui/toast', replacement: nm('@chakra-ui/toast') },
      { find: '@emotion/react', replacement: nm('@emotion/react') },
      { find: '@emotion/styled', replacement: nm('@emotion/styled') },
      { find: 'framer-motion', replacement: nm('framer-motion') },
      { find: 'downshift', replacement: nm('downshift') },
      { find: 'react-popper', replacement: nm('react-popper') },
      { find: 'react-phone-input-2', replacement: nm('react-phone-input-2') },
      { find: 'react-datepicker', replacement: nm('react-datepicker') },
      { find: 'react-select', replacement: nm('react-select') },
      { find: 'styled-components', replacement: nm('styled-components') },
    ],
  },
})
