"use client"
import { resAtom } from "@/const/atoms"
import { useAtom } from "jotai"

export default function RoadMap() {

    const [res] = useAtom(resAtom)

    return (
      <>
        {res ? (
          <div>
            {Object.entries(res).map(([step, features]) => (
              <div key={step}>
                <h3>{step}</h3>
                <ul>
                  {Object.entries(features).map(([feature, processes]) => (
                    <li key={feature}>
                      <strong>{feature}</strong>
                      <ul>
                        {(processes as unknown as string[]).map(
                          (process, index) => (
                            <li key={index}>{process}</li>
                          )
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </>
    )
}
