import {
  PageLayout,
  Section,
  Spacer,
  useTokenProvider
} from '@commercelayer/app-elements'

export function Home(): JSX.Element {
  const {
    dashboardUrl,
    settings: { mode }
  } = useTokenProvider()

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
      <Spacer top='10'>
        <Section titleSize='small' title='Browse'>
          &nbsp;
        </Section>
      </Spacer>
    </PageLayout>
  )
}
