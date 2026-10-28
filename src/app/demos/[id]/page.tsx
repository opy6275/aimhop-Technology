import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projectsData";
import { DemoViewer } from "@/components/demos/DemoViewer";

interface DemoPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Demo Not Found — AIMHOP Tech",
    };
  }

  return {
    title: `${project.name} (${project.categoryLabel}) — Live Demo | AIMHOP Tech`,
    description: `Explore the live interactive demo of ${project.name}, engineered by AIMHOP Technologies for high performance, conversions, and speed.`,
    openGraph: {
      title: `${project.name} — Interactive Live Demo | AIMHOP Tech`,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

function DemoSkeleton() {
  return (
    <div className="min-h-screen bg-white text-[#261C19] flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-[#261C19]/95 backdrop-blur-md px-4 py-3 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="h-8 w-32 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-8 w-24 bg-white/10 rounded-lg animate-pulse" />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl h-[500px] bg-slate-100 rounded-3xl animate-pulse" />
      </main>
    </div>
  );
}

async function DemoContent({ params }: DemoPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <DemoViewer project={project} />;
}

export default function DemoPage({ params }: DemoPageProps) {
  return (
    <Suspense fallback={<DemoSkeleton />}>
      <DemoContent params={params} />
    </Suspense>
  );
}
