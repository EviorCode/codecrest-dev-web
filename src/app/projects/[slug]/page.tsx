import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  type ProjectDetail,
  type ProjectTechnology,
  type ProjectTimeline,
} from "@/src/data/project.data";
import ProjectHero from "@/src/components/sections/projects/ProjectHero";
import ProjectOverview from "@/src/components/sections/projects/ProjectOverview";
import ProjectChallenges from "@/src/components/sections/projects/ProjectChallenges";
import ProjectSolutions from "@/src/components/sections/projects/ProjectSolutions";
import ProjectMetrics from "@/src/components/sections/projects/ProjectMetrics";
import ProjectTimelineSection from "@/src/components/sections/projects/ProjectTimeline";
import ProjectTechnologies from "@/src/components/sections/projects/ProjectTechnologies";
import ProjectGallery from "@/src/components/sections/projects/ProjectGallery";
import ProjectTestimonial from "@/src/components/sections/projects/ProjectTestimonial";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Codecrest",
    };
  }

  return {
    title: project.metaTitle || `${project.title} | Codecrest`,
    description: project.metaDescription || project.subtitle,
  };
}

type ProjectDetailWithExtras = ProjectDetail & {
  technologies?: ProjectTechnology[];
  timeline?: ProjectTimeline[];
  testimonials?: { quote: string; author: string; role: string }[];
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug) as ProjectDetailWithExtras | undefined;

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      {project.challenges && project.challenges.length > 0 && (
        <ProjectChallenges challenges={project.challenges} />
      )}
      {project.solutions && project.solutions.length > 0 && (
        <ProjectSolutions solutions={project.solutions} />
      )}
      {project.metrics && project.metrics.length > 0 && (
        <ProjectMetrics metrics={project.metrics} />
      )}
      {project.images && project.images.length > 0 && (
        <ProjectGallery images={project.images} />
      )}
      {project.technologies && project.technologies.length > 0 && (
        <ProjectTechnologies technologies={project.technologies} />
      )}
      {project.timeline && project.timeline.length > 0 && (
        <ProjectTimelineSection timeline={project.timeline} />
      )}
      {(project.testimonials || project.testimonial) && (
        <ProjectTestimonial
          testimonial={project.testimonial}
          testimonials={project.testimonials}
        />
      )}
    </div>
  );
}
