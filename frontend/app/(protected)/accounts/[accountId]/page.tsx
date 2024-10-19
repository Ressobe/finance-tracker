type AccountPageProps = {
  params: {
    accountId: number;
  };
};

export default function AccountPage({ params }: AccountPageProps) {
  return <div>AccountPage {params.accountId}</div>;
}
