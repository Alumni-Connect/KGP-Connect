import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const { formResponses, ...body } = await req.json();
    console.log(formResponses, body);
    const scholarshipForm = await prisma.scholarshipForm.create({
      data: {
        ...body,
        formResponses: {
          create: [...formResponses],
        },
      },
    });

    if (!scholarshipForm) {
      return NextResponse.json(
        { msg: "sorry unable to create a scholarship form" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        msg: "your form response is successfully submitted",
        id: scholarshipForm.id,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry error occurred in the session please try again later" },
      { status: 400 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, formResponses, scholarshipFormData } = await req.json();

    const [deletePreviousResponses, createNewFormResponse] =
      await prisma.$transaction([
        prisma.formResponses.deleteMany({
          where: {
            scholarshipFormId: id,
          },
        }),
        prisma.scholarshipForm.update({
          where: {
            id: id,
          },
          data: {
            ...scholarshipFormData,
            formResponses: {
              create: [...formResponses],
            },
          },
        }),
      ]);

    if (!deletePreviousResponses && createNewFormResponse) {
      return NextResponse.json(
        { msg: "sorry unable to update a scholarship form" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        msg: "your form response is successfully updated",
        formResponses: createNewFormResponse,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry error occurred in the session please try again later" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { scholarshipFormId } = await req.json();
    console.log("formid", scholarshipFormId);

    const deleteResponse = await prisma.scholarshipForm.delete({
      where: {
        id: scholarshipFormId,
      },
    });

    const filePath = join("./", "public", deleteResponse.curriculumVitae);

    await unlink(filePath);

    if (!deleteResponse) {
      return NextResponse.json(
        { msg: "sorry unable to update a scholarship form" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { msg: "your form response is successfully deleted" },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry error occurred in the session please try again later" },
      { status: 400 },
    );
  }
}
