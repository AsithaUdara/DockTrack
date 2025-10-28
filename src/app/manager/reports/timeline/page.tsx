import { redirect } from 'next/navigation';

// This route was replaced to forward users to the single timeline page
export default function Page() {
  redirect('/manager/timeline');
}