import React from "react";
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

export default async function DemoPage({ params }: DemoPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <DemoViewer project={project} />;
}
