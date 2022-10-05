//OpenTelemetry
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { trace } = require("@opentelemetry/api");
//Exporter
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
//instrumentations
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");

//Exporter
module.exports = (appName, version) => {
    const exporter = new OTLPTraceExporter();
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NULLSTONE_ENV,
            [SemanticResourceAttributes.SERVICE_NAME]: appName,
            [SemanticResourceAttributes.SERVICE_VERSION]: version,
        }),
    });
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    provider.register();
    registerInstrumentations({
        instrumentations: [
            new HttpInstrumentation(),
            new ExpressInstrumentation(),
        ],
        tracerProvider: provider,
    });
    return trace.getTracer(appName, version);
};
