import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { GithubIcon } from "@/components/ui/github";
import { LinkIcon } from "@/components/ui/link";
import { YoutubeIcon } from "@/components/ui/youtube";

interface Project {
  title: string;
  thumbnail: string;
  year: number;
  period: string;
  description: string;
  images: string[];
  link: string;
  video: string;
  repository: string;
  note: string;
  techs?: string[];
  slug: string;
  content: string;
}

export default function Home() {
  const projectsDir = path.join(process.cwd(), "public", "projects");
  const projectFiles = fs.readdirSync(projectsDir);

  const projects: Project[] = projectFiles.map((file) => {
    const filePath = path.join(projectsDir, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      title: data.title,
      thumbnail: data.thumbnail,
      year: data.year,
      period: data.period,
      description: data.description,
      images: data.images ?? null,
      link: data.link ?? null,
      video: data.video ?? null,
      repository: data.repository ?? null,
      note: data.note ?? null,
      techs: data.techs,
      slug: data.slug,
      content,
    };
  });

  const projectsByYear = projects.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);

  const sortedYears = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  console.log(sortedYears);
  console.log(projectsByYear);

  return (
    <div className="flex flex-col items-center w-screen min-h-screen">
      <div className="w-[650px] flex flex-col items-center py-2 text-start flex-grow">
        {/* Top Page */}
        <section className="text-center space-y-4 w-full">
          <h1 className="text-2xl font-bold">Your Name</h1>
          <div className="flex items-between justify-between">
            <p className="max-w-xl mx-auto text-muted-foreground">
              ここに100字程度の自己紹介文を入れます。
              <br />
              ここに100字程度の自己紹介文を入れます。
            </p>
            <div className="flex-y-grow">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </div>
          </div>
        </section>

        {/* Profile */}
        <section className="text-center space-y-4 w-full">
          <h2 className="">Profile</h2>
          <Carousel>
            <CarouselContent>
              <CarouselItem>趣味1</CarouselItem>
              <CarouselItem>趣味2</CarouselItem>
              <CarouselItem>趣味3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Projects */}
        <section className="text-center space-y-4 w-full">
          <h2 className="text-start">Projects</h2>
          {sortedYears.map((year) => (
            <div key={year} className="">
              <h3 className="text-start">{year}</h3>
              <Accordion type="single" collapsible className="w-full">
                {projectsByYear[year].map((project, idx) => (
                  <AccordionItem key={idx} value={`${year}-${idx}`}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-start w-full ">
                        <div className="flex-y-grow">
                          <Avatar className="w-24 h-24 bg-gray-200">
                            <AvatarImage
                              src={"/images/thumbnails/" + project.thumbnail}
                              alt="@shadcn"
                              className="object-contain w-full h-full"
                            />
                          </Avatar>
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="text-lg font-bold">{project.title}</h3>
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center justify-start w-full ">
                        <Carousel className="mb-6">
                          <CarouselContent className="">
                            {project.images.map((image, index) => (
                              <CarouselItem key={index} className="">
                                <div className="">
                                  <Card className="p-0 my-1 border-none">
                                    <CardContent className="flex items-center justify-center p-0 ">
                                      <Image
                                        src={"/images/details/" + image}
                                        alt={project.slug}
                                        width={72}
                                        height={72}
                                        className="w-full"
                                      />
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="absolute bottom-10 left-4" />
                          <CarouselNext className="absolute bottom-6 right-4" />
                        </Carousel>

                        <div className="flex flex-col items-start p-4 space-y-2 text-start">
                          <p>開発期間: {project.period}</p>
                          <p className="">
                            使用技術: {project.techs?.join(", ")}
                          </p>
                          {project.note && (
                            <p className="text-sm text-muted-foreground">
                              {project.note}
                            </p>
                          )}
                          <div className="flex items-center justify-end space-x-2">
                            {project.repository && <GithubIcon className="" />}
                            {project.link && <LinkIcon className="" />}
                            {project.video && <YoutubeIcon className="" />}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
