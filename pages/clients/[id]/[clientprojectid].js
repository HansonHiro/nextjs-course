import { useRouter } from "next/router";
function SelectedClientProjectPage() {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>The Project Page for a Specific Project for a Selected Client</div>
  );
}

export default SelectedClientProjectPage;
