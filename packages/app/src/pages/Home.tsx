import { ListItemStockLocation } from '#components/ListItemStockLocation'
import { stockLocationsInstructions } from '#data/filters'
import {
  EmptyState,
  PageLayout,
  useResourceFilters,
  useTokenProvider
} from '@commercelayer/app-elements'
import { navigate, useSearch } from 'wouter/use-location'

export function Home(): JSX.Element {
  const {
    canUser,
    dashboardUrl,
    settings: { mode }
  } = useTokenProvider()

  const queryString = useSearch()

  const { SearchWithNav, FilteredList } = useResourceFilters({
    instructions: stockLocationsInstructions
  })

  if (!canUser('read', 'stock_locations')) {
    return (
      <PageLayout title='Inventory' mode={mode}>
        <EmptyState title='You are not authorized' />
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title='Inventory'
      mode={mode}
      gap='only-top'
      navigationButton={{
        onClick: () => {
          window.location.href =
            dashboardUrl != null ? `${dashboardUrl}/hub` : '/'
        },
        label: 'Hub',
        icon: 'arrowLeft'
      }}
    >
      <SearchWithNav
        queryString={queryString}
        onUpdate={(qs) => {
          navigate(`?${qs}`, {
            replace: true
          })
        }}
        onFilterClick={() => {}}
        hideFiltersNav
      />
      <FilteredList
        type='stock_locations'
        query={{
          sort: {
            created_at: 'desc'
          }
        }}
        ItemTemplate={ListItemStockLocation}
        emptyState={<EmptyState title='No stock locations yet!' />}
      />
    </PageLayout>
  )
}
