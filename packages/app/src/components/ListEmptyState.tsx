import { appRoutes } from '#data/routes'
import {
  A,
  Button,
  EmptyState,
  useTokenProvider
} from '@commercelayer/app-elements'
import type { FC } from 'react'

import { Link, useRoute } from 'wouter'

export const ListEmptyState: FC = () => {
  const { canUser } = useTokenProvider()

  const [, params] = useRoute<{ stockLocationId: string }>(
    appRoutes.newStockItem.path
  )

  const stockLocationId = params?.stockLocationId ?? ''

  if (canUser('create', 'skus')) {
    return (
      <EmptyState
        title='No stock items yet!'
        description='Create your first stock item'
        action={
          <Link href={appRoutes.newStockItem.makePath(stockLocationId)}>
            <Button variant='primary'>New stock item</Button>
          </Link>
        }
      />
    )
  }

  return (
    <EmptyState
      title='No stock items yet!'
      description={
        <div>
          <p>Add a stock item with the API, or use the CLI.</p>
          <A
            target='_blank'
            href='https://docs.commercelayer.io/core/v/api-reference/stock_items'
            rel='noreferrer'
          >
            View API reference.
          </A>
        </div>
      }
    />
  )
}
