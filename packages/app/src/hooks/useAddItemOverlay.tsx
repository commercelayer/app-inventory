import { ListEmptyState } from '#components/ListEmptyState'
import { ListItemSku } from '#components/ListItemSku'
import { useOverlay, useResourceFilters } from '@commercelayer/app-elements'
import type { FiltersInstructions } from '@commercelayer/app-elements/dist/ui/resources/useResourceFilters/types'
import type { Sku } from '@commercelayer/sdk'
import { navigate, useSearch } from 'wouter/use-location'

interface OverlayHook {
  show: (type: 'skus' | 'bundles') => void
  Overlay: React.FC<{ onConfirm: (resource: Sku) => void }>
}

export function useAddItemOverlay(): OverlayHook {
  const { Overlay: OverlayElement, open, close } = useOverlay()

  const instructions: FiltersInstructions = [
    {
      label: 'Search',
      type: 'textSearch',
      sdk: {
        predicate: ['name', 'code'].join('_or_') + '_cont'
      },
      render: {
        component: 'searchBar'
      }
    }
  ]

  return {
    show: () => {
      open()
    },
    Overlay: ({ onConfirm }) => {
      const queryString = useSearch()
      const { SearchWithNav, FilteredList } = useResourceFilters({
        instructions
      })

      return (
        <OverlayElement>
          <div className='w-full flex items-center gap-4'>
            <div className='flex-1'>
              <SearchWithNav
                onFilterClick={() => {}}
                onUpdate={(qs) => {
                  navigate(`?${qs}`, {
                    replace: true
                  })
                }}
                queryString={queryString}
                hideFiltersNav
                searchBarPlaceholder='search...'
              />
            </div>
            <div className='mt-4 mb-14'>
              <button
                onClick={() => {
                  close()
                }}
                className='text-primary font-bold rounded px-1 shadow-none !outline-0 !border-0 !ring-0 focus:shadow-focus'
              >
                Cancel
              </button>
            </div>
          </div>

          <FilteredList
            type='skus'
            query={{
              fields: {
                customers: [
                  'id',
                  'email',
                  'total_orders_count',
                  'created_at',
                  'updated_at',
                  'customer_group'
                ]
              }
            }}
            ItemTemplate={(props) => (
              <ListItemSku
                variant='list'
                onSelect={(resource) => {
                  onConfirm(resource)
                  close()
                  navigate(`?`, {
                    replace: true
                  })
                }}
                {...props}
              />
            )}
            emptyState={<ListEmptyState />}
          />
        </OverlayElement>
      )
    }
  }
}
